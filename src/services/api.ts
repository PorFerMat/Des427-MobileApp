import axios from 'axios';

const api = axios.create({
  baseURL: 'https://des427-backend.onrender.com', // เปลี่ยนให้ตรงกับ backend บน Render
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
