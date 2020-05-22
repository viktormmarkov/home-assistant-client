import axios from 'axios';
console.log('http://localhost:3031');
export default axios.create({
    baseURL: 'http://localhost:3031',
    withCredentials: true
})