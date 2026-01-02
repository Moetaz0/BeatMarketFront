import api from "./api";

const licenseService = {
  // Get all licenses
  async getAllLicenses() {
    try {
      const response = await api.get("/api/licenses");
      console.log("Licenses fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch licenses:", error);
      throw error;
    }
  },

  // Get a single license by ID
  async getLicense(id) {
    try {
      const response = await api.get(`/api/licenses/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch license:", error);
      throw error;
    }
  },
};

export default licenseService;
