import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Audio from "../models/Audio.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });  //your comment and who you are (user.id)
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const audio = await Audio.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === audio.userId) { //commentor can delete owner of audio can delete
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete only your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ audioId: req.params.audioId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};