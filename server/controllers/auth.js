import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from "bcryptjs";  //crate to encrpyt new password
import { createError } from '../error.js';
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
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
        const user = await User.findOne({ name: req.body.name }); //findOne is a mongoose method to look into User db and try to find name

        if (!user) return next(createError(404, "User not found!"));       //send detailed error using error.js

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return next(createError(400, "Wrong Password!"));

        const token = jwt.sign({ id: user._id }, process.env.JWT);  //token for a signed in user

        const { password, ...others } = user._doc; //destructure user data and reassign password to a separate variable to avoid sending password as part of response

        res
            .cookie("access_token", token, {
                httpOnly: true,
            }) // cookie name access_token, cookie = token; cookie stores on http only support not apps for security
            .status(200)
            .json(others); //sends info of user and subscribers as res except password
    } catch (err) {
        next(err);
    }
};