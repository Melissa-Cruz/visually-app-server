// const Timeline = require("../models/timelineModel");

const timelineData = require("../data/timelines");

const getAllTimelines = async (req, res, next) => {
  try {
    // const timelines = await Timeline.find({});
    const timelines = timelineData;

    return res.status(200).json({
      success: { message: "This route gets all the timelines." },
      data: { timelines },
      statusCode: 200,
    });
  } catch (error) {
    // return next(error);
    return res.status(400).json({
      error: { message: "Resource not found. Search again." },
      statusCode: 400,
    });
  }
};

const getTimeline = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const timeline = timelineData.find((timeline) => timeline._id === _id);
    return res.status(200).json({
      success: { message: "This will send a single timeline by its id." },
      data: { timeline:timeline },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Resource not found found" },
      statusCode: 400,
    });
  }
};

const createTimeline = async (req, res, next) => {
  const {
    timeline_name,
    timeline_description,
    timeline_start_date,
    timeline_steps,
    timeline_cover_image_url,

    moments,
  } = req.body;

  try {
    const newTimeline = {
      timeline_name,
      timeline_description,
      timeline_start_date,
      timeline_steps,
      timeline_cover_image_url,

      moments,
    };
    return res.status(201).json({
      success: { message: "This will create a new timeline." },
      data: { newTimeline },
      statusCode: 201,
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Resource not created" },
      statusCode: 400,
    });
  }
};

const updateTimeline = async (req, res, next) => {
  const { _id } = req.params;
  const {
    timeline_name,
    timeline_description,
    timeline_start_date,
    timeline_steps,
    timeline_cover_image_url,

    moments,
  } = req.body;

  try {
    const updatedTimeline = {
      timeline_name,
      timeline_description,
      timeline_start_date,
      timeline_steps,
      timeline_cover_image_url,

      moments,
    };

    return res.status(201).json({
      success: { message: "This will update a timeline by its id." },
      data: { updatedTimeline },
      statusCode: 201,
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Oh no there's an error - wahhhh, losing it" },
      statusCode: 400,
    });
  }
};

const deleteTimeline = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const timelines = timelineData.filter((timeline) => timeline_id !== _id);
    return res.status(200).json({
      success: { message: "This will delete a timeline by its id" },
      data:{timelines}, 
      statusCode:200,
    });
  } catch (error) {
    return res.status(400).json({
        error:{message: "fire. There's an error"}, 
        statusCode:400,
    });
  }
};

module.exports = {
  getAllTimelines,
  getTimeline,
  createTimeline,
  updateTimeline,
  deleteTimeline,
};
