import axios from "axios";

const api = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://dummy.sandroandrade.org/",
});

export default api;
