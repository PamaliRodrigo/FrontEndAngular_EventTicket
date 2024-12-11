import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api/config";

// View configuration (GET)
export const viewConfiguration = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/view`);
    return response.data;  // Return the configuration data
  } catch (error) {
    console.error("Error fetching configuration:", error);
    throw new Error("Failed to load configuration");
  }
};

// Update configuration (POST)
export const updateConfiguration = async (config) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update`, config);
    return response.data;  // Return the success message or updated config
  } catch (error) {
    console.error("Error updating configuration:", error);
    throw new Error("Failed to update configuration");
  }
};

// Save configuration (POST) with filePath as a query parameter
export const saveConfiguration = async (filePath) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save`, null, {
      params: { filePath },
    });
    return response.data;  // Return the success message from the backend
  } catch (error) {
    console.error("Error saving configuration:", error);
    throw new Error("Failed to save configuration");
  }
};

// Load configuration (POST) with filePath as a query parameter
export const loadConfiguration = async (filePath) => {
    try {
      if (!filePath) {
        throw new Error("File path is required.");
      }
      const response = await axios.post(`${API_BASE_URL}/load`, null, {
        params: { filePath },
      });
      return response.data;
    } catch (error) {
      console.error("Error loading configuration:", error);
      throw new Error("Failed to load configuration");
    }
  };
  
