import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = ({ configuration }) => {
  const defaultConfiguration = {
    eventName: "Unknown Event",
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
    maxTicketCapacity: 0,
    ticketPrice: 0,
  };

  const config = configuration || defaultConfiguration;

  const [ticketsAvailable, setTicketsAvailable] = useState(0);
  const [ticketsBought, setTicketsBought] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [log, setLog] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/updates");

    socket.onmessage = (event) => {
      const message = event.data;

      // Update tickets available or tickets sold based on the message
      if (message.startsWith("Tickets Available:")) {
        const available = parseInt(message.split(":")[1].trim(), 10);
        setTicketsAvailable(available);
      } else if (message.startsWith("Tickets Sold:")) {
        const sold = parseInt(message.split(":")[1].trim(), 10);
        setTicketsBought(sold);
      }

      // Log the message
      setLog((prevLog) => [message, ...prevLog]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleStart = () => {
    fetch("http://localhost:8080/start-simulation")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to start simulation");
        }
        return response.text();
      })
      .then((message) => {
        setLog((prevLog) => [message, ...prevLog]);
        setIsRunning(true);
      })
      .catch((error) => {
        setLog((prevLog) => [`Error: ${error.message}`, ...prevLog]);
      });
  };

  const handleStop = () => setIsRunning(false);

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
      <div className="button-group">
        <button
          className={`start-button ${isRunning ? "disabled" : ""}`}
          onClick={handleStart}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className={`stop-button ${!isRunning ? "disabled" : ""}`}
          onClick={handleStop}
          disabled={!isRunning}
        >
          Stop
        </button>
      </div>
      <div className="log-container">
        <h3>Activity Log</h3>
        <ul className="log-list">
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
