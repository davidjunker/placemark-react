import axios from "axios";

const baseUrl = "https://stark-plains-47911.herokuapp.com";

export const PlacemarkService = {
  async authenticate(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  },

  async login(email, password) {
    try {
      const response = await axios.post(`${baseUrl}/api/users/authenticate`, {
        email,
        password,
      });
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;
      if (response.data.success) {
        console.log(response.data);
        localStorage.setItem("userid", JSON.stringify(response.data.userid));
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("password", JSON.stringify(password));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  async logout() {
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("userid");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  },

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.post(baseUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  },

  async updateUser(firstName, lastName, email, password, userid) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.put(baseUrl + "/api/users/" + userid, userDetails);
      localStorage.setItem("email", JSON.stringify(email));
      localStorage.setItem("password", JSON.stringify(password));
      return true;
    } catch (error) {
      return false;
    }
  },

  async deleteUser(userid) {
    try {
      await axios.delete(baseUrl + "/api/users/" + userid);
      localStorage.removeItem("userid");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      return true;
    } catch (error) {
      return false;
    }
  },

  async adminDeleteUser(userid) {
    try {
      await axios.delete(baseUrl + "/api/users/" + userid);
      return true;
    } catch (error) {
      return false;
    }
  },

  async getUser(id) {
    try {
      const res = await axios.get(baseUrl + "/api/users/" + id);
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async getUserCategories(id) {
    try {
      const res = await axios.get(baseUrl + "/api/users/" + id + "/categories");
      if (res.data.length <= 0) {
        return null;
      }
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async createCategory(category) {
    try {
      const res = await axios.post(baseUrl + "/api/categories", category);
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async getCategory(id) {
    try {
      const res = await axios.get(baseUrl + "/api/categories/" + id);
      if (res === null) {
        return null;
      }
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async deleteCategory(id) {
    try {
      await axios.delete(baseUrl + "/api/categories/" + id);
      return true;
    } catch (error) {
      return false;
    }
  },

  async getPoi(id) {
    try {
      const res = await axios.get(baseUrl + "/api/pois/" + id);
      if (res === null) {
        return null;
      }
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async createPoi(id, poi) {
    try {
      const res = await axios.post(
        baseUrl + "/api/categories/" + id + "/pois",
        poi
      );
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async deletePoi(id) {
    try {
      await axios.delete(baseUrl + "/api/pois/" + id);
      return true;
    } catch (error) {
      return false;
    }
  },

  async uploadImage(id, formData) {
    try {
      const res = await axios.post(
        baseUrl + "/api/pois/" + id + "/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      return false;
    }
  },

  async deleteImage(id) {
    try {
      await axios.delete(baseUrl + "/api/images/" + id);
      return true;
    } catch (error) {
      return false;
    }
  },

  async getAnalytics(id) {
    try {
      const res = await axios.get(baseUrl + "/api/admin/" + id + "/analytics");
      return res.data;
    } catch (error) {
      return null;
    }
  },
};
