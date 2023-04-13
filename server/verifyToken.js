import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; //get token from cookie in the req

  //for no token at all
  if (!token) return next(createError(401, "You are not authenticated!"));

  //if token, verification algorithm
  jwt.verify(token, process.env.JWT, (err, user) => { //user targets user id
    //err means invalid token on verification
    if (err) return next(createError(403, "Token is not valid!"));
    //ok arm
    req.user = user; //reassign jwt user id for use to verify if the signed user is however the owner of specific account in the controllers fn
    next()
  });
};