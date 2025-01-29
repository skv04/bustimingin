import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/BusLocation.css"; // Add custom CSS

// Fixing default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const BusLocation = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [nearestArea, setNearestArea] = useState("");
  const loc = useLocation();
  const item = loc.state; // Data passed via React Router
  const busnum = item?.BusNumber;
  const [date, setDate] = useState(null);

  useEffect(() => {
    let intervalId;

    const getLocation = async () => {
      try {
        const response = await axios.post("https://bustimingin-backend.onrender.com/getlocation", {
          busnum,
        });
        if (response.data && response.data.length > 0) {
          const { latitude, longitude, date } = response.data[0];
          setLocation({ latitude, longitude });

          const datenow = new Date(date);
          const formattedDate = datenow.toLocaleDateString();
          const formattedTime = datenow.toLocaleTimeString();
          setDate(`${formattedDate} ${date.split("T")[1].substring(0,8)}`);

          // Fetch nearest area using reverse geocoding
          const geoResponse = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          setNearestArea(geoResponse.data?.address?.display_name || "Unknown Area");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    if (busnum) {
      // Call immediately
      getLocation();

      // Set up interval
      intervalId = setInterval(getLocation, 5000);
    }

    return () => {
      // Clear interval when component unmounts or `busnum` changes
      clearInterval(intervalId);
    };
  }, [busnum]);

  return (
    <div>
      <Header />
      <div className="container mt-5" >
        <h2 className="text-center mb-4" style={{marginTop:"140px"}}>Bus Tracker</h2>
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="card mb-4 shadow">
              {item?.Photo ? (
                <img
                  src={item.Photo}
                  className="card-img-top"
                  alt={item.BusNumber}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              ) : (
                <div
                  className="card-img-top d-flex justify-content-center align-items-center"
                  style={{
                    height: "200px",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  No Image Available
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{item?.BusNumber}</h5>
                <p className="card-text">
                  <strong>Stops:</strong> {item?.Busstops} <br />
                  <strong>Arrival:</strong> {item?.Arrivaltime} <br />
                  <strong>Departure:</strong> {item?.Departuretime} <br />
                  <strong>Source:</strong> {item?.Source} <br />
                  <strong>Destination:</strong> {item?.Destination} <br />
                  <strong>Driver:</strong> {item?.Driver} <br />
                  <strong>Company:</strong> {item?.BusCompany}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            {location.latitude !== 0 && location.longitude !== 0 ? (
              <div>
                <MapContainer
                  center={[location.latitude, location.longitude]}
                  zoom={16}
                  style={{ width: "100%", height: "400px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[location.latitude, location.longitude]}>
                    <Popup>Bus Location</Popup>
                  </Marker>
                </MapContainer>
                <p className="mt-3">
                  <strong>Nearest Area:</strong> {nearestArea}
                </p>
              </div>
            ) : (
              <p>Loading bus location...</p>
            )}
          </div>
        </div>
        <div className="text-center mt-3">
          <p><strong>Last Updated:</strong> {date}</p>
        </div>
      </div>
    </div>
  );
};

export default BusLocation;
