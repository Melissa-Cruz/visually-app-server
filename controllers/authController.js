const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const register = async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;
  console.log("register");

  if (error) {
    return next(error);
  } else if (!firstName || username || !password) {
    return response.status(400).json({
      error: { message: "Missing required fields." },
      statusCode: 400,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      firstName,
      lastName,
      username,
      password: hashedPassword,
      googleId: "",
    };

    await newUser.save();

    req.login(newUser, (error) => {
      if (err) {
        return next(error);
      }
      newUser.password = undefined;

      return res.status(201).json({
        success: { message: "New user is created" },
        data: { newUser },
        statusCode: 201,
      });
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  // passwords should be compared ... I don't think I did this because I don't see it

  const { username, password } = req.body;
  const user = await User.find({ username });

  bcrypt.compare(password, user.password, (error, result) => {
    //result == true;
    if (error) {
      return done(error);
    }
    return done(null, user);
  });

  return res.status(200).json({
    success: { message: "User logged in." },
    statusCode: 200,
  });
};

const logout = async (req, res, next) => {
  console.log("Initializing logout controller logic");

  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
  });
  console.log("session destroyed");

  res.clearCookie("connect.sid");

  res.status(200).json({
    success: { message: "User logging out" },
    statusCode: 200,
  });
  console.log("Logout function activated. Logging out...");
};

const localLogin = async (req, res, next) => {
  //make a copy of the user, then change the password of the copy. MongoDB by default will not send any undefined values in the response.
  const userCopy = { ...req.user._doc };
  userCopy.password = undefined;

  //refactoring: tell passport to authenticate the "local" login by targeting the user,

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    // if no user detected
    if (!user) {
      return response.status(401).json({
        error: { message: "There is not a user detected. Please try again" },
      });
    }
    //use the login method to confirm the user
    request.login(user, (err) => {
      if (err) {
        return next(err);
      }

      const userCopy = { ...req.user._doc };
      userCopy.password = undefined;

      console.log(userCopy);

      response.status(200).json({
        success: {
          message: "Login successful within local authentication feature.",
        },
        data: { user: userCopy },
        statusCode: 200,
      });
    });
  });
};

module.exports = { register, login, logout, localLogin };
