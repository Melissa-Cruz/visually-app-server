// --------------------Initialize Express---------------
//require dependencies and set up express environment
const express = require("express");
const app = express();
const PORT = 8080;

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

//Create six basic GET routes with the following information using the

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: { message: "This route points to the Home page." },
  });
});

app.get("/api/timeline", (req, res, next) => {
  res.status(200).json({
    success: { message: "This route gets all the timelines." },
  });
});

app.get("/api/timeline/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will send a single timeline by its id." },
  });
});

app.get("/api/timeline/create/new", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will create a new timeline." },
  });
});

app.get("/api/timeline/update/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will update a timeline by its id." },
  });
});

app.get("/api/timeline/delete/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will delete a timeline by its id" },
  });
});

app.listen(PORT, () => {
  console.log(
    `The server is listening on port ${PORT}, http://localhost:${PORT}/`
  );
});
