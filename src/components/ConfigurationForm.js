import React, { useEffect, useState } from "react";
import "./ConfigurationForm.css";

const ConfigurationForm = () => {
  const [configuration, setConfiguration] = useState({
    eventName: "",
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
    maxTicketCapacity: 0,
    ticketPrice: 0,
  });

  const [message, setMessage] = useState("");

  // Fetch Configuration on Page Load
  useEffect(() => {
    fetch("http://localhost:8080/api/config/view")
      .then((response) => response.json())
      .then((data) => setConfiguration(data))
      .catch((error) =>
        setMessage(`Failed to fetch configuration: ${error.message}`)
      );
  }, []);

  // Update Configuration Handler
  const updateConfiguration = () => {
    fetch("http://localhost:8080/api/config/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(configuration), // Send the entire configuration object
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update configuration");
        }
        return response.text();
      })
      .then((data) => setMessage(data))
      .catch((error) =>
        setMessage(`Failed to update configuration: ${error.message}`)
      );
  };

  return (
    <div className="config-form-container">
      <h1>Event Configuration</h1>
      <form
        className="config-form"
        onSubmit={(e) => {
          e.preventDefault();
          updateConfiguration();
        }}
      >
        <label>
          Event Name:
          <input
            type="text"
            value={configuration.eventName || ""}
            onChange={(e) =>
              setConfiguration({ ...configuration, eventName: e.target.value })
            }
          />
        </label>
        <label>
          Total Tickets:
          <input
            type="number"
            value={configuration.totalTickets || ""}
            onChange={(e) =>
              setConfiguration({
                ...configuration,
                totalTickets: e.target.value === "" ? 0 : parseInt(e.target.value, 10),
              })
            }
          />
        </label>
        <label>
          Ticket Release Rate:
          <input
            type="number"
            value={configuration.ticketReleaseRate || ""}
            onChange={(e) =>
              setConfiguration({
                ...configuration,
                ticketReleaseRate: e.target.value === "" ? 0 : parseInt(e.target.value, 10),
              })
            }
          />
        </label>
        <label>
          Customer Retrieval Rate:
          <input
            type="number"
            value={configuration.customerRetrievalRate || ""}
            onChange={(e) =>
              setConfiguration({
                ...configuration,
                customerRetrievalRate: e.target.value === "" ? 0 : parseInt(e.target.value, 10),
              })
            }
          />
        </label>
        <label>
          Max Ticket Capacity:
          <input
            type="number"
            value={configuration.maxTicketCapacity || ""}
            onChange={(e) =>
              setConfiguration({
                ...configuration,
                maxTicketCapacity: e.target.value === "" ? 0 : parseInt(e.target.value, 10),
              })
            }
          />
        </label>
        <label>
          Ticket Price:
          <input
            type="number"
            step="0.01"
            value={configuration.ticketPrice || ""}
            onChange={(e) =>
              setConfiguration({
                ...configuration,
                ticketPrice: e.target.value === "" ? 0 : parseFloat(e.target.value),
              })
            }
          />
        </label>
        <div className="button-group">
          <button type="submit">Update Configuration</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ConfigurationForm;
