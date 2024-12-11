import React, { useState, useEffect } from 'react';
import { viewConfiguration, updateConfiguration, saveConfiguration, loadConfiguration } from './apiService'; // Assuming this file is named apiService.js

const ConfigurationPage = () => {
  const [configuration, setConfiguration] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch configuration data when the page loads
    const fetchConfiguration = async () => {
      try {
        const config = await viewConfiguration();
        setConfiguration(config);
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchConfiguration();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedConfig = await updateConfiguration(configuration);
      setConfiguration(updatedConfig);  // Update the state with new config
      setMessage("Configuration updated successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await saveConfiguration(filePath);
      setMessage(response);  // Success message
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLoad = async () => {
    try {
      const loadedConfig = await loadConfiguration(filePath);
      setConfiguration(loadedConfig);  // Update the configuration state
      setMessage("Configuration loaded successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="configuration-form">
      <h1>Event Configuration</h1>
      {configuration && (
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={configuration.eventName}
            onChange={(e) => setConfiguration({ ...configuration, eventName: e.target.value })}
          />
          <label>Total Tickets:</label>
          <input
            type="number"
            value={configuration.totalTickets}
            onChange={(e) => setConfiguration({ ...configuration, totalTickets: e.target.value })}
          />
          <label>Ticket Release Rate:</label>
          <input
            type="number"
            value={configuration.ticketReleaseRate}
            onChange={(e) => setConfiguration({ ...configuration, ticketReleaseRate: e.target.value })}
          />
          <label>Customer Retrieval Rate:</label>
          <input
            type="number"
            value={configuration.customerRetrievalRate}
            onChange={(e) => setConfiguration({ ...configuration, customerRetrievalRate: e.target.value })}
          />
          <label>Max Ticket Capacity:</label>
          <input
            type="number"
            value={configuration.maxTicketCapacity}
            onChange={(e) => setConfiguration({ ...configuration, maxTicketCapacity: e.target.value })}
          />
          <label>Ticket Price:</label>
          <input
            type="number"
            value={configuration.ticketPrice}
            onChange={(e) => setConfiguration({ ...configuration, ticketPrice: e.target.value })}
          />
        </div>
      )}
      <button onClick={handleUpdate}>Update Configuration</button>
      <div>
        <input
          type="text"
          placeholder="Enter file path"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
        />
        <button onClick={handleSave}>Save Configuration</button>
        <button onClick={handleLoad}>Load Configuration</button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default ConfigurationPage;
