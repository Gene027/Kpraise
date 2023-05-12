import User from '../models/User.js';
import bcrypt from "bcryptjs";  //crate to encrpyt new password
import { createError } from '../error.js';
import jwt from "jsonwebtoken";

export const signup = async (req, res,next) => {
    try {
        //hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // req.body must contain name, email and password
        const newUser = new User({ ...req.body, password: hash });   //new instance of userSchema and overwrite password with new hash

        await newUser.save();
        res.status(200).send("User has been created!")
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }); //findOne is a mongoose method to look into User db and try to find name

        if (!user) return next(createError(404, "User not found!"));       //send detailed error using error.js

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return next(createError(400, "Wrong Password!"));

        const newToken = jwt.sign({ id: user._id }, process.env.JWT, {expiresIn: "2h"});  //token for a signed in user    encryption will be made based on the payload and .env.JWT and dencrypt (jwt.verify()) will return {id: user._id}
        try {
            await User.findByIdAndUpdate(user._id, { token: newToken });
        } catch (err) {
            next(err);
        }

        const { password,token, ...others } = user._doc; //destructure user data and reassign password to a separate variable to avoid sending password as part of response

        res
            .cookie("access_token", newToken, {
                maxAge: 1000 * 60 * 120,
                // httpOnly: true,
            }) // cookie name access_token, cookie = token; cookie stores on http only support not apps for security    1000*60 = 1 minute   maxAge here is 2hrs
            .status(200)
            .json(others); //sends info of user and subscribers as res except password
    } catch (err) {
        next(err);
    }
};

export const signout = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { token: "" });
        res
            .cookie("access_token", "", {
                maxAge: 0,
                httpOnly: true,
            })
            .status(200).json("Successfully logged out");
    } catch (err) {
        next(err);
    }
};

export const verifyUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const { password,token, ...others } = user._doc; //destructure user data and reassign password to a separate variable to avoid sending password as part of response
        res.status(200).json(others);
    } catch (err) {
        next(err);
    }
};
