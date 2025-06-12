const express = require("express");
const router = express.Router();


const {getAllTimelines, getTimeline, createTimeline, updateTimeline, deleteTimeline} = require("../controllers/timelineController")


router.get(("/"), getAllTimelines); 
router.get(("/:_id"), getTimeline);
// router.get(("/"))
router.post(("/create/new"), createTimeline);
router.put(("/edit/:_id"), updateTimeline); 
router.delete(("/delete/:_id"), deleteTimeline); 

module.exports = router;