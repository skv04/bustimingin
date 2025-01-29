var express = require("express");
var bodyParser = require("body-parser");
var app = express.Router();
app.use(bodyParser.json());
var mongoose = require("mongoose");

const busgpsschema = new mongoose.Schema(
  {
    busid: { type: String },
    longitude: { type: String },
    latitude: { type: String },
    date:{type:Date},
  },
  { timestamps: true }
);

const busgpsModel = mongoose.model("busgps", busgpsschema);

app.post("/getlocation", async (req, res) => {
  const { busnum } = req.body;
  const buslocation = await busgpsModel
    .find({ busid: busnum })
    .sort({ date: -1 }).limit(1);
  res.json(buslocation);
  
});

module.exports = app;
