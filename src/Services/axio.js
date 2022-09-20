import axios from "axios";

const instance = axios.create({

  baseURL: "http://localhost:8080/api/v1/go-cheeta"
});

// const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`,
// }

// var token = sessionStorage.getItem("token");
// instance.defaults.headers.common.Authorization = `Bearer ${token}`;

export default instance;