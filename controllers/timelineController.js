const Timeline = require("../models/timelineModel");

const getAllTimelines = async (req, res, next) => {
  try {
    const timelines = await Timeline.find({});

    return res.status(200).json({
      success: { message: "This route gets all the timelines." },
      data: {timelines:timelines},
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};

const getTimeline = async (req, res, next) => {

  return res.status(200).json({
    success: { message: "This will send a single timeline by its id." },
  });
};

const createTimeline = async (req, res, next) => {
  return res.status(200).json({
    success: { message: "This will create a new timeline." },
  });
};

const updateTimeline = async (req, res, next) => {
  return res.status(200).json({
    success: { message: "This will update a timeline by its id." },
  });
};

const deleteTimeline = async (req, res, next) => {
  return res.status(200).json({
    success: { message: "This will delete a timeline by its id" },
  });
};

module.exports = {
  getAllTimelines,
  getTimeline,
  createTimeline,
  updateTimeline,
  deleteTimeline,
};
