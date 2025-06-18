const mongoose = require("mongoose"); 
const {Schema} = mongoose; 

const timelineSchema  = new Schema (
    {
        timeline_name:{
            type: String,
            required: true,
            trim: true,
        }, 

        timeline_description:{
            type: String, 
            required:true, 
            trim: true,
        }, 

        timeline_start_date:{
            type: Date,
        },
        timeline_steps:{
            type: String, 
        },
        timeline_cover_image_url: {
            type:String,
        },
        moments: [
            {
           moment_title:{
            type:String, 
           }, 
            moment_description:{
                type:String,
            }, 
            moment_status: {
                type:String, 
               }, 
            moment_feeling:{
                type:String, 
               }, 
            moment_date:{
                type:String, 
               }, 
            moment_image_url:{
                type:String, 
               }, 
            moment_milestone:{
                type:Number, 
               }, 
            },
            ]
    }
)

const Timeline = mongoose.model("Timeline", timelineSchema);

module.exports =Timeline;