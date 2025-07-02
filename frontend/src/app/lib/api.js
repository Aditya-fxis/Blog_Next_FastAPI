import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllBlogs = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getBlogById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createBlog = async (data) => {
  const res = await axios.post(`${API_URL}/`, data);
  return res.data;
};

export const updateBlog = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
