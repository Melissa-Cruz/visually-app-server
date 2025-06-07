const express = require("express");
const router = express.Router();


const {getAllTimelines, getTimeline, createTimeline, updateTimeline, deleteTimeline} = require("../controllers/timelineController")


router.get(("/"), getAllTimelines); 
router.get(("/:id"), getTimeline);
router.post(("/create/new"), createTimeline);
router.put(("/edit/:id"), updateTimeline); 
router.delete(("/delete/:id"), deleteTimeline); 

module.exports = router;