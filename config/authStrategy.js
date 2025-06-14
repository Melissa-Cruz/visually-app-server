//Establish Basic Localized Strategy
const passport = require("passport"); 
const bcrypt = require("bcrypt"); 
const LocalStrategy = require("passport-local").Strategy;

//Summon the User Model
const User = require("../models/userModel");

///We'll have Passport use the initialized new Local strategy from passport

passport.use(
    new LocalStrategy (async(username, password, done ) =>{

        try{

        const user = await User.findOne({username});

        if(!user){
            return done(null, false,{
                message:"Incorrect username or password."
            });
        }
        const result = await bcrypt.compare(password, user.password);

        if(!result){
            return done(null, false, {
                message:"Incorrect username or password",
            });

        }
        return done(null, user); 
    } catch(error){
        return done(error);
    }
    })
)


passport.serializeUser((user, done)=>{
    done(null,user._id);
});

passport.deserializeUser(async (id, done)=>{
    try{
        const user = await User.findById(id); 
        done(null, user);
    }catch(error){
        done(error)
    }
});