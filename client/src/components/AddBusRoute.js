import axios from "axios";
import "./styles/addbusrote.css";
import { useEffect, useState } from "react";
function AddBusRoute() {
  const [Items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [File, setFile] = useState();
  const formData = new FormData();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setItems((values) => ({ ...values, [name]: value }));
  };
    useEffect(() => {
      const handleFetch = async () => {
        try {
          const response = await axios.post("http://localhost:5000/getroutes");
          const busData = response.data.alldata;
          setAllItems(busData);
        } catch (err) {
          console.log(err);
        }
      };

      handleFetch();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !Items.BusNumber ||
      !Items.Busstops ||
      !Items.Arrivaltime ||
      !Items.Departuretime ||
      !Items.Source ||
      !Items.Destination ||
      !Items.Driver ||
      !Items.BusCompany ||
      !File
    ) {
      alert("Please fill all required fields and select an image.");
      return;
    }

    formData.append("image", File);
    formData.append("Items", JSON.stringify(Items));

    try {
      let response;
      if (editId == null) {
        response = await axios.post(
          "http://localhost:5000/addroute",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/updateRoute",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      alert(response.data.message);
      setEditId(null);
    } catch (error) {
      console.error("Error while submitting data:", error);
      alert("There was an error while submitting the form. Please try again.");
    }
  };

  const handleEdit = (i) => {
    setEditId(allItems[i]._id);
    setItems(allItems[i]);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/deleteBusRoute`,
        {
          data: { id },
        }
      );
      alert(response.data);
    } catch (error) {
      console.error("Error while deleting:", error);
      alert("There was an error while deleting the item.");
    }
  };

  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container">
      <h1
        className="text-center my-8"
        style={{ textAlign: "center", margin: "10px"}}
      >
        Manage Bus Routes
      </h1>
      <div className="form-container ">
        <h2>Add Bus Route</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleImage}
            className="form-control mb-3"
          />
          <input
            type="text"
            onChange={handleChange}
            name="BusNumber"
            value={Items.BusNumber || ""}
            className="form-control mb-3"
            placeholder="Enter Bus Number"
          />
          <input
            type="text"
            onChange={handleChange}
            name="Busstops"
            value={Items.Busstops || ""}
            className="form-control mb-3"
            placeholder="Enter Bus Stops"
          />
          <input
            type="text"
            onChange={handleChange}
            name="Arrivaltime"
            value={Items.Arrivaltime || ""}
            className="form-control mb-3"
            placeholder="Arrival Time"
          />
          <input
            type="text"
            onChange={handleChange}
            name="Departuretime"
            value={Items.Departuretime || ""}
            className="form-control mb-3"
            placeholder="Departure Time"
          />
          <input
            type="text"
            onChange={handleChange}
            name="Source"
            value={Items.Source || ""}
            className="form-control mb-3"
            placeholder="Source"
          />
          <input
            type="text"
            onChange={handleChange}
            name="Destination"
            value={Items.Destination || ""}
            className="form-control mb-3"
            placeholder="Destination"
          />
          <input
            type="text"
            onChange={handleChange}
            name="Driver"
            value={Items.Driver || ""}
            className="form-control mb-3"
            placeholder="Driver Name"
          />
          <input
            type="text"
            onChange={handleChange}
            name="BusCompany"
            value={Items.BusCompany || ""}
            className="form-control mb-3"
            placeholder="Bus Company Name"
          />
          <button type="submit" className="btn btn-dark submitbtn">
            {editId ? "Update Route" : "Add Route"}
          </button>
        </form>
      </div>
      <div className="container mt-4">
        <div className="row">
          {allItems.map((item, i) => (
            <div className="col-md-4 mb-4" key={i}>
              {/* 3 cards per row */}
              <div className="card h-80">
                {item.Photo ? (
                  <img
                    src={item.Photo}
                    width="100%"
                    height="200px"
                    className="card-img-top"
                    alt={item.BusNumber}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="card-img-top"
                    style={{
                      height: "200px",
                      width: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    No Image Available
                  </div>
                )}
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
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-dark"
                      onClick={() => handleEdit(i)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-dark"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddBusRoute;
