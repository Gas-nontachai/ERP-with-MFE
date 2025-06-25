import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/user";

export const getUsers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createUser = async (data: { name: string }) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateUser = async (id: string, data: { name: string }) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
