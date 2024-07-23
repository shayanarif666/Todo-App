import React, { useId, useState } from 'react'
import TodoItem from './TodoItem'
import { useTodo } from '../context/todoContext'

function Todo() {

    const { addTodo } = useTodo();

    const [todo, setTodo] = useState("");
    const [status, setStatus] = useState(false);

    // Get Todos From LocalStorage
    const getDataFromLocalStor = JSON.parse(localStorage.getItem("todos")) || [];

    const handleAddTodo = () => {
        const todoItem = {
            id: Date.now(),
            todoText: todo,
            completed: status
        }
        addTodo(todoItem);
    }

    return (
        <>
            <div className="container">
                <div className="todo-item p-4">
                    <h4 className='text-white text-center mb-3'>Create Your Own Todo</h4>

                    <div className="input-group todo-input">
                        <input type="text" onChange={(e) => setTodo(e.target.value)} className="form-control me-2" placeholder="Enter Todo" />
                        <button className="input-group-text text-white bg-danger" onClick={handleAddTodo} id="basic-addon2">Add Todo</button>
                    </div>

                    <div className="todo-container">
                        {
                            getDataFromLocalStor.length > 0 ?
                                getDataFromLocalStor.map((todo) => (
                                    <TodoItem todo={todo} key={todo.id} />
                                ))
                                :
                                ""
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
