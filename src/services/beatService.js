import api from "./api";

const beatService = {
  // Create a new beat
  async createBeat(formData) {
    try {
      console.log("Creating beat with FormData...");
      console.log("FormData entries:");
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(
            pair[0] +
              ": File - " +
              pair[1].name +
              " (" +
              pair[1].size +
              " bytes)"
          );
        } else {
          console.log(pair[0] + ": " + pair[1]);
        }
      }

      const response = await api.post("/api/beats", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Beat creation response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Beat creation error:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
      throw error;
    }
  },

  // Get all beats
  async getAllBeats() {
    try {
      const response = await api.get("/api/beats");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch beats:", error);
      throw error;
    }
  },

  // Get beats by user ID
  async getBeatsByUser(userId, page = 1, limit = 10) {
    try {
      const response = await api.get(`/api/beats/user/${userId}`, {
        params: { page, limit },
      });
      console.log("User beats response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user beats:", error);
      throw error;
    }
  },

  // Get a single beat by ID
  async getBeat(id) {
    try {
      const response = await api.get(`/api/beats/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch beat:", error);
      throw error;
    }
  },

  // Update a beat
  async updateBeat(id, formData) {
    try {
      const response = await api.post(`/api/beats/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Beat update error:", error);
      throw error;
    }
  },

  // Delete a beat
  async deleteBeat(id) {
    try {
      const response = await api.delete(`/api/beats/${id}`);
      return response.data;
    } catch (error) {
      console.error("Beat deletion error:", error);
      throw error;
    }
  },
};

export default beatService;
