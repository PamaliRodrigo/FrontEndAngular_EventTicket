import React, { useState } from 'react';
import './Form.css'; // Styling for the form
import { createTicket } from './services/api'; // API call

const TicketForm = () => {
    const [event, setEvent] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTicket({ event, price: parseFloat(price) });
            alert('Ticket saved successfully!');
            setEvent('');
            setPrice('');
        } catch (error) {
            console.error('Error saving ticket:', error);
            alert('Failed to save ticket.');
        }
    };

    return (
        <div className="form-container">
            <h2>Add Ticket</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="event">Event:</label>
                <input
                    type="text"
                    id="event"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    placeholder="Enter event name"
                    required
                />
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    required
                />
                <button type="submit">Save Ticket</button>
            </form>
        </div>
    );
};

export default TicketForm;
