/**
 * FetchNodeServices.js
 *
 * Provides utility functions for making HTTP requests to the backend API.
 * Includes methods for GET and POST requests, and server URL configuration.
 */
import axios from "axios";

var serverURL = "http://localhost:5000";
const getData = async (url) => {
  try {
    let headers = {};
    if (localStorage.getItem("TOKEN")) {
      headers = { headers: { Authorization: localStorage.getItem("TOKEN") } };
    }
    var response = await axios.get(`${serverURL}/${url}`, headers);
    var result = await response.data;

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const postData = async (url, body) => {
  try {
    alert(localStorage.getItem("TOKEN"))
    let headers = {};
    if (localStorage.getItem("TOKEN")) {
      headers = { headers: { Authorization: localStorage.getItem("TOKEN") } };
    }
    var response = await axios.post(`${serverURL}/${url}`, body, headers);
    var result = await response.data;

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { serverURL, getData, postData };
