import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import { getTodos, createTodo, deleteTodo } from "./API";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    getTodos()
      .then(({ data }) => {
        setTodos(data);
      })
      .then(console.log)
      .catch((err) => console.log(err));
  };

  const handleCreateTodo = (e, formData) => {
    e.preventDefault();
    createTodo(formData)
      .then(() => {
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (todoId) => {
    deleteTodo(todoId)
      .then(() => {
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="App">
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleCreateTodo} />
      {todos && todos.map((todo) => (
        <TodoItem key={todo.id} deleteTodo={handleDeleteTodo} todo={todo} />
      ))}
    </main>
  );
};

export default App;
