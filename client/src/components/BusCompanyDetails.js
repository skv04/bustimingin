import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const BusCompanyDetails = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    

    useEffect(()=>{
        const fetchCompanyDetails = async () => { 
            try {// Debugging line
                const response = await axios.post(`http://localhost:5000/api/getcompanydetails`);                
                setSearchResults(response.data.companyDetails);
            } catch (error) {
                console.error('Error fetching company details:', error);
                setSearchResults([]);
            }
        };
        fetchCompanyDetails();
    },[])
    
    

    return (
        <div>
            <Header />
            <main className="main-content" style={{marginTop:"100px",padding:"20px",}}>
                <section style={{ margin:"10px auto",width:"75%"}}>
                    <h2 style={{textAlign:"center"}}>Bus Company Details</h2>
                    
                    <div className="company-list">
                        {searchResults.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Company Name</th>
                                        <th>Contact</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.map((company) => (
                                        <tr key={company.id}>
                                            <td>{company.company_name}</td>
                                            <td>{company.contact}</td>
                                            <td>{company.address}</td>
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

export default BusCompanyDetails;
