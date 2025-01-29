import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { useEffect } from 'react';

const DriverDetails = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/driverdetails`,{searchTerm});
            setSearchResults(response.data.drivers)            
        } catch (error) {
            console.error('Error fetching driver details:', error);
        }
    };
    useEffect(() => {
            handleSearch();
        }, [searchTerm]);

    return (
        <div>
            <Header />
            <main className="main-content" style={{marginTop:"100px",padding:"20px",}}>
                <section style={{ margin:"10px auto",width:"75%"}}>
                    <h2 style={{textAlign:"center"}}>Driver Details</h2>
                    <div className="search-bar" style={{marginLeft:"20px"}}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by Driver Name or License Number"
                            style={{marginRight:"10px"}}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div className="driver-list">
                        {searchResults.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Driver Name</th>
                                        <th>License Number</th>
                                        <th>Contact</th>
                                        <th>Company Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.map((driver) => (
                                        <tr key={driver.id}>
                                            <td>{driver.driver_name}</td>
                                            <td>{driver.license_number}</td>
                                            <td>{driver.contact_number}</td>
                                            <td>{driver.company_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DriverDetails;
