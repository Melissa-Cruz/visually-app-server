require("dotenv").config();
require("./config/connection");
require("./config/authStrategy");

//make a comment that says session and passport here
const session = require("express-session");
const passport = require("passport");

//-----------Move routes before the app initialization ---------------
//-----------Get the Routes------
const timelineRoutes = require("./routes/timelineRoutes");
const authRoutes = require("./routes/authRoutes");

// --------------------Initialize Express---------------
//require dependencies and set up express environment
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// --------------------Middleware------------------------
//require dependencies
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

//require path after the dependencies
const path = require("node:path");

//use the packages
app.use(helmet());
// app.use(helmet({ contentSecurityPolicy: false }));

app.use(morgan("combined"));
app.use(cors());
// app.use(cors({credentials:true, origin:true}));

//put more notes
app.use(express.static(path.join(__dirname + "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//make a comment that says session management

//Session management login, signup, logout

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,

    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// const timelines = require("./models/timelineModel");
//Use the  Routes
app.use("/api/timelines", timelineRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: { message: "This route points to the Home page.Yay" },
    statusCode: 200,
    // data: timelines,
  });
});

//catch any errors before the app fully boots up
app.use((err, req, res, next) => {
  if (err.code == 11000) {
    return res.status(err.status || 400).json({
      error: { message: "Already have an account? Try logging in." },
      statusCode: err.status || 400,
    });
  }

  return res.status(err.status || 500).json({
    error: { message: err.message || "Internal server error." },
    statusCode: err.status || 500,
  });
});

app.listen(PORT, () => {
  console.log(
    `The server is listening on port ${PORT}, http://localhost:${PORT}/`
  );
});
