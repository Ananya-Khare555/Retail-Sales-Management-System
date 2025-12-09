import axios from 'axios';
import { BASE_URL } from '../config';

// const API_URL = 'http://localhost:5000/api/sales'

export const fetchSalesData = async (params = {}) => {
  const response = await axios.get(`${BASE_URL}/sales`, { params });
  return response.data;
};





