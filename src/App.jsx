import { useEffect, useState } from 'react'
import './App.css'
import Todo from './components/AddTodo'
import { TodoProvider } from './context/todoContext'

function App() {

  const [todos, setTodos] = useState([]);

  // Adding Todo Item
  const addTodo = (todo) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos, todo];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  // Updating Todo Item
  const updateTodo = (id, newTodo) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        return todo.id === id ? newTodo : todo;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    })
  }

  // Deleting Todo Item
  const deleteTodo = (todoID) => {
    setTodos((prevData) => {
      const newTodos = prevData.filter((todo) => todo.id !== todoID);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    })
  }


  // Set todos array when component mounted
  useEffect(() => {
    const getTodosData = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(getTodosData);
  }, [])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      <Todo />
    </TodoProvider>
  )
}

export default App
