const express = require('express');//required for HTTP methods like GET and POST
const morgan = require("morgan"); //  logs the HTTP request
const bodyParser = require("body-parser"); // for parsing request from frontend to server
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")

const User = require('./models/user')

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE, 
    { useNewUrlParser: true, useUnifiedToplology: true},
    err => {
        if(err){
            console.log(err);
        } else{
            console.log("Connected to the database");
        }
    }
    
);

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
//require APIs

const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category")
const ownerRoutes = require("./routes/owner")

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);


// app.get("/", (req, res) =>{
//     res.json("Welcome");
// });

// app.post("/", (req, res) =>{
//     let user = new User();
//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.password = req.body.password;

//     user.save(err => {
//         if(err){
//             res.json(err);
//         }else{
//             res.json("Successfully saved");
//         }
//     });
// });


app.listen(3000, err =>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening on : ", 3000);
    }
});