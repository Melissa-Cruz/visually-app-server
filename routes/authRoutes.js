const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  localLogin,
} = require("../controllers/authController");
const passport = require("passport");

router.post("/register", register);

// router.post("/login", 
//     passport.authenticate("local",{
//         failureRedirect:"/login/error",
//         failureMessage:true,
//     }),
// login);

router.get("/login/error", (req, res, next) => {
  return res.json("login error");
});

router.post("/login/local", localLogin);

router.get("/logout", logout);

router.get("/unauthenticated", (req, res, next) => {
  console.log("Returning to the homepage...");
  response.redirect("/");
});

//Google authentication
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  })
);

module.exports = router;
