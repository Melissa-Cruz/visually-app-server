const mongoose = require("mongoose");

async function main() {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Mongoose database is connected."); 
    }catch(error){
        console.error(`There was an error connection to the database: ${error}`);

    }
}; 

main();