const mongoose = require("mongoose");

// const DB="mongodb+srv://krinalsonara78:krinal@cluster0.upr0kge.mongodb.net/Blog?retryWrites=true&w=majority";

mongoose.connect("mongodb://localhost:27017/Blog")
.then(()=>{
    console.log("Connection Succesful");
}).catch(()=>{
    console.log("No Connection");
});