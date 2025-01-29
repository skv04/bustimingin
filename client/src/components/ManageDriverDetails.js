import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/admindriver.css'

const ManageDriverDetails = () => {
    const [driverDetails, setDriverDetails] = useState([]);
    const [form, setForm] = useState({
        driver_name: '',
        license_number: '',
        contact_number: '',
        company_name: '',
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchDriverDetails();
    }, []);

    const fetchDriverDetails = async () => {
        try {
            const response = await axios.post('https://bustimingin-backend.onrender.com/admin/driverdetails');
            setDriverDetails(response.data.drivers);
        } catch (error) {
            console.error('Error fetching driver details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`https://bustimingin-backend.onrender.com/api/admin/driverdetails/${editingId}`, form);
            } else {
                await axios.post('https://bustimingin-backend.onrender.com/api/admin/driverdetails', form);
            }
            fetchDriverDetails();
            setForm({
                driver_name: '',
                license_number: '',
                contact_number: '',
                company_name: '', // Reset new field
            });
            setEditingId(null);
        } catch (error) {
            console.error('Error saving driver detail:', error);
        }
    };

    const handleEdit = (driver) => {
        setForm(driver);
        setEditingId(driver._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://bustimingin-backend.onrender.com/api/admin/driverdetails/${id}`);
            fetchDriverDetails();
        } catch (error) {
            console.error('Error deleting driver detail:', error);
        }
    };

    return (
        <div className="manage-details">
            <h2>Manage Driver Details</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Driver Name"
                    value={form.driver_name}
                    onChange={(e) => setForm({ ...form, driver_name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="License Number"
                    value={form.license_number}
                    onChange={(e) => setForm({ ...form, license_number: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Contact"
                    value={form.contact_number}
                    onChange={(e) => setForm({ ...form, contact_number: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Company Name"
                    value={form.company_name} // New field
                    onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    required
                />
                <button type="submit">{editingId ? 'Update' : 'Add'} Driver Detail</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Driver Name</th>
                        <th>License Number</th>
                        <th>Contact</th>
                        <th>Company Name</th> {/* New column */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {driverDetails.map((driver) => (
                        <tr key={driver.id}>
                            <td>{driver.driver_name}</td>
                            <td>{driver.license_number}</td>
                            <td>{driver.contact_number}</td>
                            <td>{driver.company_name}</td> {/* New data */}
                            <td>
                                <button onClick={() => handleEdit(driver)}>Edit</button>
                                <button onClick={() => handleDelete(driver._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageDriverDetails;
