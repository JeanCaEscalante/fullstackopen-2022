import axios from "axios";

const url = `${process.env.REACT_APP_URI_API}`;

const request = axios.create({
    baseURL: url,
});

export default request;
