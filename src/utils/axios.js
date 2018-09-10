import axios from "axios/index";

export default axios.create({
    baseURL: 'http://localhost:3001/',
});