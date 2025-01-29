const express = require("express");
const bodyParser = require("body-parser");
const app = express.Router();
app.use(bodyParser.json());
const multer = require("multer");

const mongoose = require("mongoose");

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

const BusScheduleSchema = new mongoose.Schema({
  Photo: Buffer,
  BusNumber: String,
  Busstops: String,
  Arrivaltime: String,
  Departuretime: String,
  Source: String,
  Destination: String,
  Driver: String,
  BusCompany: String,
});
const BusRouteModel = mongoose.model("BusRoutes", BusScheduleSchema);

const BusCompanySchema = new mongoose.Schema({
  contact: String,
  address: String,
  company_name: String,
});
const BusCompanyModel = mongoose.model("BusCompanies", BusCompanySchema);

const BusDriverSchema = new mongoose.Schema({
  driver_name: String,
  licence_number: String,
  contact_number: String,
  company_name: String,
});
const BusDriverModel = mongoose.model("busdrivers", BusDriverSchema);

app.post("/api/getcompanydetails", async (req, res) => {
  try {
    const companyDetails = await BusCompanyModel.find({}); // Fetch all documents
    res.json({ companyDetails });
  } catch (err) {
    console.error("Error fetching company details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/admin/getcompanydetails", async (req, res) => {
  try {
    const companyDetails = await BusCompanyModel.find({}); // Fetch all documents
    res.json({ companyDetails });
  } catch (err) {
    console.error("Error fetching company details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/driverdetails", async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const drivers = await BusDriverModel.find({
      $or: [
        { driver_name: { $regex: searchTerm, $options: "i" } },
        { license_number: { $regex: searchTerm, $options: "i" } },
      ],
    });

    res.json({ drivers });
  } catch (err) {
    console.error("Error fetching driver details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/admin/driverdetails", async (req, res) => {
  try {
    const drivers = await BusDriverModel.find({});

    res.json({ drivers });
  } catch (err) {
    console.error("Error fetching driver details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addroute", upload, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ messDriver: "No file uploaded" });
  }
  const {
    BusNumber,
    Busstops,
    Arrivaltime,
    Departuretime,
    Source,
    Destination,
    Driver,
    BusCompany,
  } = JSON.parse(req.body.Items);
  const { buffer } = req.file;
  const newRoute = new BusRouteModel({
    Photo: buffer,
    BusNumber: BusNumber,
    Busstops: Busstops,
    Arrivaltime: Arrivaltime,
    Departuretime: Departuretime,
    Source: Source,
    Destination: Destination,
    Driver: Driver,
    BusCompany: BusCompany,
  });
  const saveNewRoute = await newRoute.save();
  if (saveNewRoute) {
    res.json({ message: "Added Successfully" });
  } else {
    res.json({ message: "Bus Route Details not saved yet" });
  }
});
app.post("/getroutes", async (req, res) => {
  const { Source, Destination, time } = req.body;
  try {
    const query = {};
    if (Source) {
      query.Source = { $regex: Source, $options: "i" };
    }
    if (Destination) {
      query.Destination = { $regex: Destination, $options: "i" };
    }
    if (time) {
      query.Departuretime = { $regex: time, $options: "i" };
    }

    const retriveRoutes = await BusRouteModel.find(query);

    const routesWithBase64Photo = retriveRoutes.map((item) => {
      const base64Photo = item.Photo ? item.Photo.toString("base64") : null;
      return {
        ...item._doc,
        Photo: base64Photo ? `data:image/jpeg;base64,${base64Photo}` : null,
      };
    });

    res.json({ alldata: routesWithBase64Photo });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Bus routes", error });
  }
});

app.post("/updateRoute", upload, async (req, res) => {
  const {
    _id,
    BusNumber,
    Busstops,
    Arrivaltime,
    Departuretime,
    Source,
    Destination,
    Driver,
    BusCompany,
  } = JSON.parse(req.body.Items);
  const { buffer } = req.file;
  const editItems = await BusRouteModel.findByIdAndUpdate(
    _id,
    { Photo: buffer },
    { BusNumber: BusNumber },
    { Driver: Driver },
    { Busstops: Busstops },
    { Arrivaltime: Arrivaltime },
    { Departuretime: Departuretime },
    { Source: Source },
    { Destination: Destination },
    { BusCompany: BusCompany },
    { new: true }
  );
  if (editItems) {
    res.json({ message: "Updated Successfully" });
  } else {
    res.json({ message: "Not updated yet" });
  }
});

app.delete("/deleteBusRoute", async (req, res) => {
  const { id } = req.body;
  const deletedItems = await BusRouteModel.findByIdAndDelete(id);
  if (deletedItems) res.json("Deleted Successfully");
  else res.json("Not deleted yet");
});

app.post("/api/admin/companydetails", async (req, res) => {
  try {
    const { company_name, contact, address } = req.body;
    const newCompany = new BusCompanyModel({ company_name, contact, address });
    await newCompany.save();
    res.status(201).json({ message: "Company detail added successfully" });
  } catch (err) {
    console.error("Error adding company detail:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/admin/companydetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name, contact, address } = req.body;
    await BusCompanyModel.findByIdAndUpdate(id, {
      company_name,
      contact,
      address,
    });
    res.status(200).json({ message: "Company detail updated successfully" });
  } catch (err) {
    console.error("Error updating company detail:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/admin/deletecompanydetails", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    await BusCompanyModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Company detail deleted successfully" });
  } catch (err) {
    console.error("Error deleting company detail:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put('/api/admin/driverdetails/:id', async (req, res) => {
  const { id } = req.params;
  const { driver_name, license_number, contact_number, company_name } = req.body;

  try {
      const updatedDriver = await BusDriverModel.findByIdAndUpdate(
          id,
          { driver_name, license_number, contact_number, company_name },
          { new: true } // Return the updated document
      );

      if (!updatedDriver) {
          return res.status(404).json({ error: 'Driver not found' });
      }

      res.status(200).json({ message: 'Driver detail updated successfully', updatedDriver });
  } catch (err) {
      console.error('Error updating driver detail:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete driver detail
app.delete('/api/admin/driverdetails/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedDriver = await BusDriverModel.findByIdAndDelete(id);

      if (!deletedDriver) {
          return res.status(404).json({ error: 'Driver not found' });
      }

      res.status(200).json({ message: 'Driver detail deleted successfully' });
  } catch (err) {
      console.error('Error deleting driver detail:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = app;
