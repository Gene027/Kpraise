// export const test = (req, res) => {
//     console.log("test is working")
//     res.json("Successful")
// }
import { createError } from "../error.js";
import User from "../models/User.js";
import Audio from "../models/Audio.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) { //ensure signed in id matches id of account to update; so any signed user cannot just update any account
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, //updates the db
        },
        { new: true } //return new instance of user and not test; ensure real time update
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { //user.id is id of logged in user from jwt
      $push: { subscribedUsers: req.params.id },   //params.id is id of other channel to subscribe to; subscribedUsers are users you have subscribed to, will save in your account db
    });
    await User.findByIdAndUpdate(req.params.id, {   //increase that other channel subscribers count
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const audioId = req.params.audioId;
  try {
    await Audio.findByIdAndUpdate(audioId,{
      $addToSet:{likes:id}, //using push will duplicate user id
      $pull:{dislikes:id}
    })
    res.status(200).json("The audio has been liked.")
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const audioId = req.params.audioId;
    try {
      await Audio.findByIdAndUpdate(audioId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
      })
      res.status(200).json("The audio has been disliked.")
  } catch (err) {
    next(err);
  }
};