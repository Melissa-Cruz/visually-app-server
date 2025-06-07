


  
const getAllTimelines = async (req, res, next) => {
     
    return res.status(200).json({
      success: { message: "This route gets all the timelines." },
    });
  };
  
const getTimeline = async (req, res, next) => {
    return res.status(200).json({
      success: { message: "This will send a single timeline by its id." },
    });
};
  
const createTimeline =async (req, res, next) => {
    return res.status(200).json({
      success: { message: "This will create a new timeline." },
    });
  };
  
const updateTimeline = async (req, res, next) => {
    return res.status(200).json({
      success: { message: "This will update a timeline by its id." },
    });
  };
  
const deleteTimeline =async (req, res, next) => {
    return res.status(200).json({
      success: { message: "This will delete a timeline by its id" },
    });
  };


  module.exports = {getAllTimelines, getTimeline, createTimeline, updateTimeline, deleteTimeline};