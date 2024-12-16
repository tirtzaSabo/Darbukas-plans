import axios from 'axios';
import config from "../config";
const Axios =axios.create({
    baseURL:config.api,
    timeout:5000,
});
export default Axios;
