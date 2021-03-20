import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.43.100:9000'
});

export default instance;