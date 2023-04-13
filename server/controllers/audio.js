import User from "../models/User.js";
import Audio from "../models/Audio.js";
import { createError } from "../error.js";

export const addAudio = async (req, res, next) => {
  const newAudio = new Audio({ userId: req.user.id, ...req.body });
  try {
    const savedAudio = await newAudio.save();
    res.status(200).json(savedAudio);
  } catch (err) {
    next(err);
  }
};

export const updateAudio = async (req, res, next) => {
  try {
    const audio = await Audio.findById(req.params.id);
    if (!audio) return next(createError(404, "audio not found!"));
    if (req.user.id === audio.userId) { //ensure updating by owner
      const updatedAudio = await audio.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedAudio);
    } else {
      return next(createError(403, "You can update only your audio!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteaudio = async (req, res, next) => {
  try {
    const audio = await Audio.findById(req.params.id);
    if (!audio) return next(createError(404, "audio not found!"));
    if (req.user.id === audio.userId) {
      await Audio.findByIdAndDelete(req.params.id);
      res.status(200).json("The audio has been deleted.");
    } else {
      return next(createError(403, "You can delete only your audio!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getAudio = async (req, res, next) => {
  try {
    const audio = await Audio.findById(req.params.id);
    res.status(200).json(audio);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Audio.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const audios = await Audio.aggregate([{ $sample: { size: 20 } }]); //mongo db fn to return random samples of size 40 audios
    res.status(200).json(audios);
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const audios = await Audio.find().sort({ views: -1 }); // nb: +1 returns least viewed video, mongo db fn
    res.status(200).json(audios);
  } catch (err) {
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); //find user so we can get his subscribedChannels array listing; request.user.id comes from jwt signed token
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {   //iterates over all your Subscription to find audios
        return await Audio.find({ userId: channelId }); //find all audios in the matching current iter id
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt)); //list returns array of array [[]], flat() reduces it;    sort method to see newest video first 
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(","); //   /tags?tags=gospel,praise    
  try {
    const audios = await Audio.find({ tags: { $in: tags } }).limit(20); //$in looks inside arr tags to find matches and return results just as in filter method
    res.status(200).json(audios);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q; //search?q=joy  
  try {
    const audios = await Audio.find({
      title: { $regex: query, $options: "i" },
    }).limit(40); //regex to query in words not chars;  options: "i" ignores uppercase strict mode
    res.status(200).json(audios);
  } catch (err) {
    next(err);
  }
};