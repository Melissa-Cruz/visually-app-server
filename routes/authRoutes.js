const express = require("express");
const router = express.Router;

const {
  register,
  login,
  logout,
  localLogin,
} = require("../controllers/authController");

router.post("/register", register);
router.get("/login", login);
router.get("/login/error", (req, res, next) => {
  return res.json("login error");
});

router.get("/login/local", localLogin);
router.get("/logout", logout);

router.get("/unauthenticated", (req, res, next) => {
  console.log("Returning to the homepage...");
  response.redirect("/");
});

module.exports = router;
