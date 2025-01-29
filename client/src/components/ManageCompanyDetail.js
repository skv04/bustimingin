import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/admindriver.css'

const ManageCompanyDetails = () => {
    const [companyDetails, setCompanyDetails] = useState([]);
    const [form, setForm] = useState({
        company_name: '',
        contact: '',
        address: '',
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCompanyDetails();
    }, []);

    const fetchCompanyDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/getcompanydetails');
            setCompanyDetails(response.data.companyDetails);
        } catch (error) {
            console.error('Error fetching company details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/admin/companydetails/${editingId}`, form);
            } else {
                await axios.post('http://localhost:5000/api/admin/companydetails', form);
            }
            fetchCompanyDetails();
            setForm({
                company_name: '',
                contact: '',
                address: '',
            });
            setEditingId(null);
        } catch (error) {
            console.error('Error saving company detail:', error);
        }
    };

    const handleEdit = (company) => {
        setForm(company);
        setEditingId(company._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/admin/deletecompanydetails`,{id});
            fetchCompanyDetails();
        } catch (error) {
            console.error('Error deleting company detail:', error);
        }
    };

    return (
        <div className="manage-details">
            <h2>Manage Company Details</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Company Name"
                    value={form.company_name}
                    onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Contact"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    required
                />
                <button type="submit">{editingId ? 'Update' : 'Add'} Company Detail</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companyDetails.map((company) => (
                        <tr key={company.id}>
                            <td>{company.company_name}</td>
                            <td>{company.contact}</td>
                            <td>{company.address}</td>
                            <td>
                                <button onClick={() => handleEdit(company)}>Edit</button>
                                <button onClick={() => handleDelete(company._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageCompanyDetails;
