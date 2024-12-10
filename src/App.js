import React, { useState } from "react";
import ConfigurationForm from "./components/ConfigurationForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [configuration, setConfiguration] = useState({
    eventName: "",
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
    maxTicketCapacity: 0,
    ticketPrice: 0,
  });

  return (
    <div className="App">
      {!isConfigured ? (
        <ConfigurationForm
          onSubmit={(config) => {
            setConfiguration(config); // Save configuration
            setIsConfigured(true); // Switch to Dashboard
          }}
        />
      ) : (
        <Dashboard configuration={configuration} />
      )}
    </div>
  );
}

export default App;
