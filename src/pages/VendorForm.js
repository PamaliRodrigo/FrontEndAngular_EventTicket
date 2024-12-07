import React, { useState } from 'react';
import './Form.css'; // Styling for the form
import { createVendor } from './services/api'; // API call

const VendorForm = () => {
    const [ticketsPerRelease, setTicketsPerRelease] = useState('');
    const [releaseInterval, setReleaseInterval] = useState('');
    const [totalTickets, setTotalTickets] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVendor({ ticketsPerRelease, releaseInterval, totalTickets });
            alert('Vendor configuration saved successfully!');
            setTicketsPerRelease('');
            setReleaseInterval('');
            setTotalTickets('');
        } catch (error) {
            console.error('Error saving vendor configuration:', error);
            alert('Failed to save vendor configuration.');
        }
    };

    return (
        <div className="form-container">
            <h2>Add Vendor</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="ticketsPerRelease">Tickets Per Release:</label>
                <input
                    type="number"
                    id="ticketsPerRelease"
                    value={ticketsPerRelease}
                    onChange={(e) => setTicketsPerRelease(e.target.value)}
                    placeholder="Enter tickets per release"
                    required
                />
                <label htmlFor="releaseInterval">Release Interval (minutes):</label>
                <input
                    type="number"
                    id="releaseInterval"
                    value={releaseInterval}
                    onChange={(e) => setReleaseInterval(e.target.value)}
                    placeholder="Enter release interval"
                    required
                />
                <label htmlFor="totalTickets">Total Tickets:</label>
                <input
                    type="number"
                    id="totalTickets"
                    value={totalTickets}
                    onChange={(e) => setTotalTickets(e.target.value)}
                    placeholder="Enter total tickets"
                    required
                />
                <button type="submit">Save Vendor</button>
            </form>
        </div>
    );
};

export default VendorForm;
