import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = ({ configuration }) => {
  // Ensure configuration is valid before accessing properties
  const defaultConfiguration = {
    eventName: "Unknown Event",
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
    maxTicketCapacity: 0,
    ticketPrice: 0,
  };

  const config = configuration || defaultConfiguration;

  const [ticketsAvailable, setTicketsAvailable] = useState(config.totalTickets);
  const [ticketsBought, setTicketsBought] = useState(0);

  useEffect(() => {
    // Simulate real-time ticket updates
    const interval = setInterval(() => {
      if (ticketsAvailable > 0) {
        setTicketsAvailable((prev) => prev - 1);
        setTicketsBought((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ticketsAvailable]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Event Dashboard</h1>
      <div className="dashboard-card">
        <h2>{config.eventName}</h2>
        <p>
          <strong>Total Capacity:</strong> {config.totalTickets}
        </p>
        <p>
          <strong>Tickets Available:</strong> {ticketsAvailable}
        </p>
        <p>
          <strong>Tickets Bought:</strong> {ticketsBought}
        </p>
        <p>
          <strong>Ticket Price:</strong> ${config.ticketPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
