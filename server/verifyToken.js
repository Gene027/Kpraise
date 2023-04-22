import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import User from './models/User.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; //get token from cookie in the req
  //for no token at all
  if (!token) return next(createError(401, "You are not authenticated!"));

  //if token, verification algorithm
  jwt.verify(token, process.env.JWT, async (err, user) => { //user object targets user id    user = {id: user._id} from signin
    //err means invalid token on verification
    if (err) return next(createError(403, "Token is not valid! or your session is over"));
    //ok arm
    try {
      const currentUser = await User.findById(user.id);
      if (currentUser.token === token) {
        req.user = user; //reassign jwt user id for use to verify if the signed user is however the owner of specific account in the controllers fn 
        next()
      }
      else { return next(createError(401, "Your session is over")) }

    } catch (err) {
      return next(createError(400, "User not found"));
    }
  });
};