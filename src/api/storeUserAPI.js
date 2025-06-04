import axios from "axios";

const BASE_URL = "http://localhost:8080/api/store/users";

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/getusers`);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
