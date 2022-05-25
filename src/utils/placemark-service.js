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
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("userid", JSON.stringify(response.data.userid));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  async logout() {
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
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
};
