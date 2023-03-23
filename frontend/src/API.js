import axios from "axios";

const API_URL = "http://localhost:4001";


export const getTodos = async () => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};

export const createTodo = async (formData) => {
  const response = await axios.post(`${API_URL}/todos`, formData);
  return response.data;
};

export const deleteTodo = async (todoId) => {
  await axios.delete(`${API_URL}/todos/${todoId}`);
};
