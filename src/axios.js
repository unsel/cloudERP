import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://clouderp-c9cfa.firebaseio.com/'
});

export default instance;