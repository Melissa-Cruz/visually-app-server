

const register = async (req, res, next) =>{
   const {firstName, lastName, username, password} = req.body; 

   try{
    const newUser ={firstName, lastName, username, password};
    return res.status(201).json({
        success:{message:"New user is created"}, 
        data:{newUser},  
        statusCode:201,
    });

   }catch(error){
    return res.status(500).json({
        success:{error: "Internal server error"}, 
        statusCode:500,
    });

   }
};


const login = async (req, res, next) =>{
    return res.status(200).json({
        success:{message: "User logged in."}, 
        statusCode:200,

    });
}; 


const logout = async (req, res, next) =>{
    console.log("Initializing logout controller logic");

    console.log("session destroyed"); 
    res.clearCookie("connect.sid");

    res.status(200).json({
        success:{message: "User logging out"},
        statusCode: 200,
    });

    function sessionDestruction(err){
        if(err){
            return next(err);
        }
    }

    sessionDestruction();
    console.log("Logout function activated. Logging out...")

}; 


const localLogin = async (req, res, next) => { 
    let result = true; 

    function mockPassport(err, user){
        if(err){
            return next(err);
        }
    }
    mockPassport();

    res.status(200).json({
        success:{ message: "Login successful."}, 
        data:{ result:result},
        statusCode:200,
        });
}; 

module.exports = {register, login, logout, localLogin};