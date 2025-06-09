// --------------------Initialize Express---------------
//require dependencies and set up express environment
const express = require("express");
const app = express();
const PORT = 3000;

// --------------------Middleware------------------------
//require dependencies
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

//require path after the dependencies
const path = require("node:path");

//use the packages
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());

//Google what everything means again
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "public")));


//----------------------Get the Routes-------------------
const timelineRoutes = require("./routes/timelineRoutes");
const authRoutes = require("./routes/authRoutes");
//Use the  Routes
app.use ("/auth", authRoutes);
app.use("/api/timelines",timelineRoutes );

//Create six basic GET routes with the following information using the

// const timelines = require("./models/timelineModel"); 

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: { message: "This route points to the Home page." },
    // data: timelines,
  });
});

//catch any errors before the app fully boots up 
app.use((err, req, res, next)=>{
    if(err.code==1100){
      return res.status(err.status || 400).json({
        error:{message:"Already have an account? Try logging in."}, 
        statusCode:err.status || 400
      });
    }
  
    return res.status(err.status||500).json({
      error:{message:err.message || "Internal server error."}, 
      statusCode:err.status||500,
    }); 
  });


app.listen(PORT, () => {
  console.log(
    `The server is listening on port ${PORT}, http://localhost:${PORT}/`
  );
});
