var express = require("express");
const signupRoute = require("./SignupRoute");
const busDetailsRoute=require("./busDetailsRoute");
const gpsRoute=require("./mobileRoute");

var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var cors = require("cors");

mongoose
  .connect("mongodb+srv://selva:selva2004@cluster0.wo0nx.mongodb.net/bustimingin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to Mongodb"))
  .catch((error) => console.error("Does not connect to mongodb " + error));


  
app.use(bodyParser.json());
app.use(cors());
app.use(signupRoute);
app.use(busDetailsRoute);
app.use(gpsRoute);

app.listen(5000, function () {
  console.log("Hii Everyone");
});
