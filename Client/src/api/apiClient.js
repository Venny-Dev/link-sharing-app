import { BASEURL } from "../utils/constants";
import Cookies from "js-cookie";

class ApiClient {
  getHeader() {
    const token = Cookies.get("jwt");
    return token ? `Bearer ${token}` : "";
  }
  async request(endpoint, options = {}) {
    const url = `${BASEURL}${endpoint}`;
    const header = this.getHeader();

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(header && { Authorization: header }),
        ...options.headers,
      },
      credentials: "include",
      ...options,
    };

    if (config.body instanceof FormData) {
      delete config.headers["Content-Type"];
    } else if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body);
    }

    try {
      const res = await fetch(url, config);
      const data = await res.json();
      console.log(data);
      if (data.token) {
        Cookies.set("jwt", data.token);
      }

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return { data: data.data, message: data.message };
    } catch (err) {
      // Remove this line to stop console errors:
      // console.error("Api Error", err);
      throw new Error(err.message || err);
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: "POST", body });
  }

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: "PATCH", body });
  }
}

const api = new ApiClient();
export default api;
