const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const login =  async (req, res, next) =>{
  res.status(200).json({
    success:{message:"User logged in."}, 
    statusCode:200,
  });
};

const register = async (req, res, next) => {
  console.log("register");

  const { firstName, lastName, username, password, googleId, githubId } = req.body;
  console.log(req.body)


 if (!firstName || !username || !password) {
    return res.status(400).json({
      error: { message: "Missing required fields." },
      statusCode: 400,
    });
  };

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      googleId: "",
    });

    await newUser.save();

    req.login(newUser, (error) => {
      if (error) {
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

// const login = async (req, res, next) => {
//   // passwords should be compared ... I don't think I did this because I don't see it

//   const { username, password } = req.body;
//   const user = await User.find({ username });

//   bcrypt.compare(password, user.password, (error, result) => {
//     //result == true;
//     if (error) {
//       return done(error);
//     }
//     return done(null, user);
//   });

//   return res.status(200).json({
//     success: { message: "User logged in." },
//     statusCode: 200,
//   });
// };




const logout = async (req, res, next) => {
  console.log("Initializing logout controller logic");
  req.logout((error)=>{
    if(error){
      return next(error);
    }

  req.session.destroy((error)=>{
    if(error){
      return next(error);
    }
  });

  console.log("Session destroyed"); 

  res.clearCookie("connect.sid");
  return res.status(200).json({
    success:{message:"User logged out"}, 
    statusCode:200,
  });
  })

};

const localLogin = async (req, res, next) => {
  //make a copy of the user, then change the password of the copy. MongoDB by default will not send any undefined values in the response.
  // const userCopy = { ...req.user._doc };
  // userCopy.password = undefined;

  //refactoring: tell passport to authenticate the "local" login by targeting the user,

  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }

    // if no user detected
    if (!user) {
      return res.status(401).json({
        error: { message: info.message },
      });
    }
    //use the login method to confirm the user
    req.login(user, (error) => {
      if (error) {
        return next(error);
      }

      const userCopy = { ...req.user._doc };
      userCopy.password = undefined;

      console.log(userCopy);

    res.status(200).json({
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
