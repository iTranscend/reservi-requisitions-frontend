import axios from "axios";

axios.defaults.baseURL =
  "https://cors-anywhere.herokuapp.com/https://reserve20201214044942.azurewebsites.net";
// axios.defaults.headers.common = {
//   Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
// };

export default {
  axios,
};
