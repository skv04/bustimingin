var express = require("express");
var bodyParser = require("body-parser");
var app = express.Router();
app.use(bodyParser.json());
var mongoose = require("mongoose");

const loginschema = new mongoose.Schema({
  Email: {type:String,unique:true,required:true},
  Password:{type:String,required:true}
});

const loginmodel = mongoose.model("login", loginschema);

app.post("/signup", async function (req, res) {
  const { Email, Password, Repassword } = req.body;
  const user= await loginmodel.findOne({
    Email:Email
});
if(user){
    return  res.json({error:"Already Email exist! Please Sign in"});
}
  if (Password === Repassword) {
    const newLogin = new loginmodel({
      Email: Email,
      Password: Password, 
    });
    const loginsave = await newLogin.save();
    res.json({message:"Register Successful"});
  } else {
    res.json({error:"Passwords are not same!"});
  }
});

app.post("/signin", async function(req,res){
    
    const {Email,Password}=req.body;
    const user= await loginmodel.findOne({
        Email:Email
    });
    if(!user){
       
       return res.json({error:"Not found!"});
    }
    else{
        if(user.Password===Password){
            res.json({message:"Successfully Logined"})
        }
        else{
            res.json({error:"Password is incorrect"});
        }  
    }
    
});
module.exports = app;
