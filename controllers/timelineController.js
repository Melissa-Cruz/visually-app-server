const Timeline = require("../models/timelineModel");

// const timelineData = require("../data/timelines");

const getAllTimelines = async (req, res, next) => {
  try {
    const timelines = await Timeline.find({});
    // const timelines = timelineData;

    return res.status(200).json({
      success: { message: "This route gets all the timelines." },
      data: { timelines },
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
    // return res.status(400).json({
    //   error: { message: "Resource not found. Search again." },
    //   statusCode: 400,
    // });
  }
};

const getTimeline = async (req, res, next) => {
  const { _id } = req.params;

  try {
    // const timeline = timelineData.find((timeline) => timeline._id === _id);

    if(!_id){ 
        throw new Error("ID is required");
    }

    const timeline=Timeline.findById(_id);
    
    if(!timeline){
        throw new Error("Timeline is not found");
    }

    return res.status(200).json({
      success: { message: "Timeline found." },
      data: {timeline },
      statusCode:200,

    });

  } catch (error) {
    return next(error)
    // return res.status(400).json({
    //   error: { message: "Resource not found found" },
    //   statusCode: 400,
    // });
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

    if(!timeline_name || !timeline_description){
        throw new Error("Missing required fields, please review.")
    }

    const newTimeline = new Timeline( {
      timeline_name,
      timeline_description,
      timeline_start_date,
      timeline_steps,
      timeline_cover_image_url,
      moments,
    });

    await newTimeline.save();

    return res.status(201).json({
      success: { message: "A new timeline is created." },
      data: { newTimeline },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
    // return res.status(400).json({
    //   error: { message: "Resource not created" },
    //   statusCode: 400,
    // });
  };
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

    if(!timeline_name||!timeline_description){
        throw new Error("Missing required fields, please review.");
    }

    const updatedTimeline = await Timeline.findByIdAndUpdate(_id,
        { $set: {
            timeline_name,
            timeline_description,
            timeline_start_date,
            timeline_steps,
            timeline_cover_image_url,
            moments,
        }
    },
    {new:true}
    );

    if(!updateTimeline){
        throw new Error("Timeline not found");
    }

    return res.status(201).json({
      success: { message: "Timeline was updated." },
      data: { timeline:updatedTimeline },
      statusCode: 201,
    });
  } catch (error) {
    return next(error)
    // return res.status(400).json({
    //   error: { message: "Oh no there's an error - wahhhh, losing it" },
    //   statusCode: 400,
    // });
  };
};

const deleteTimeline = async (req, res, next) => {
  const { _id } = req.params;

  try {

    if(!_id){
        throw new Error("Id is required");
    }

    await Timeline.findByIdAndDelete(_id);

    // const timelines = timelineData.filter((timeline) => timeline_id !== _id);
    return res.status(200).json({
      success: { message: "Timeline deleted" },
      statusCode:200,
    });
  } catch (error) {
    return next(error)
    // return res.status(400).json({
    //     error:{message: "fire. There's an error"}, 
    //     statusCode:400,
    // });
  }
};

module.exports = {
  getAllTimelines, getTimeline, createTimeline, updateTimeline, deleteTimeline
};
