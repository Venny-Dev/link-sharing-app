import axios from "axios";
import { BASEURL } from "../utils/constants";

class ApiClient {
  constructor() {
    // Create axios instance with base configuration
    this.client = axios.create({
      baseURL: BASEURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // equivalent to credentials: "include"
    });

    // Response interceptor to handle errors consistently
    this.client.interceptors.response.use(
      (response) => response.data, // Return just the data
      (error) => {
        console.error("Api Error", error);

        // Handle different error scenarios
        if (error.response) {
          // Server responded with error status
          const message =
            error.response.data?.message || "Something went wrong";
          throw new Error(message);
        } else if (error.request) {
          // Request was made but no response received
          throw new Error("Network error - no response received");
        } else {
          // Something else happened
          throw new Error(error.message || "Something went wrong");
        }
      }
    );
  }

  async request(endpoint, options = {}) {
    try {
      const response = await this.client.request({
        url: endpoint,
        ...options,
      });
      return response;
    } catch (error) {
      throw error; // Re-throw as interceptor already handled it
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      data: body, // axios uses 'data' instead of 'body'
    });
  }

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PATCH",
      data: body,
    });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      data: body,
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}

const api = new ApiClient();

export default api;
