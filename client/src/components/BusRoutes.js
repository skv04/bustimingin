import axios from "axios";
import "./styles/addbusrote.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Routes() {
  const [allItems, setAllItems] = useState([]);
  const [Source, setSource] = useState("");
  const [Destination, setDestination] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await axios.post("http://localhost:5000/getroutes", {
          Source,
          Destination,
          time,
        });
        const busData = response.data.alldata;
        setAllItems(busData);
      } catch (err) {
        console.log(err);
      }
    };

    handleFetch();
  }, [Source, Destination, time]);

  return (
    <>
      <Header />
      <div className="content">
        <div className="container py-4">
          {/* Search Inputs */}
          <div className="row mb-4">
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <input
                type="text"
                placeholder="Search Source"
                className="form-control"
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <input
                type="text"
                placeholder="Search Destination"
                className="form-control"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4">
              <input
                type="text"
                placeholder="Search Timing"
                className="form-control"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          {/* Cards */}
          <div className="row">
            {allItems.map((item, i) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4" key={i}>
                <div className="card h-100">
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    {item.Photo ? (
                      <img
                        src={item.Photo}
                        alt={item.BusNumber}
                        className="card-img-top"
                        style={{ objectFit: "cover", height: "100%" }}
                      />
                    ) : (
                      <div
                        className="card-img-top"
                        style={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#aaa",
                          fontSize: "16px",
                        }}
                      >
                        No Image Available
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.BusNumber}</h5>
                    <p className="card-text">
                      Stops: {item.Busstops} <br />
                      Arrival: {item.Arrivaltime} <br />
                      Departure: {item.Departuretime} <br />
                      Source: {item.Source} <br />
                      Destination: {item.Destination} <br />
                      Driver: {item.Driver} <br />
                      Company: {item.BusCompany}
                    </p>
                    <Link to="/buslocation" state={item} className="btn btn-primary btn-sm">
                      See more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Routes;
