import React, { useEffect, useState } from 'react'
import { useTodo } from '../context/todoContext'

function TodoItem({ todo }) {


    const { deleteTodo, updateTodo } = useTodo();

    const [todoText, setTodoText] = useState(todo.todoText);
    const [isEditable, setIsEditable] = useState(false);

    // Filter Out Array and Delete Item
    const handleDeleteTodo = (randomID) => {
        deleteTodo(randomID);
    }

    // Save Todo Item
    const handleUpdateTodo = (todoMsg, id) => {
        updateTodo(id, { ...todo, todoText: todoMsg });
        setIsEditable(false);
    }

    // Edit Todo
    const handleEditTodo = () => {
        setIsEditable(true);
    }

    // Complete Todo
    const handleCompleteTodo = (id, todoStatus) => {
        updateTodo(id, { ...todo, completed: !todoStatus });
    }

    return (
        <>

            <div
                className={`d-flex mt-4 align-items-center todo-list ${todo.completed ? "complete" : "pending"
                    }`}
                key={todo.id}
            >
                <input
                    type="checkbox"
                    className={`cursor-pointer me-2 check-mark`}
                    onChange={() => handleCompleteTodo(todo.id, todo.completed)}
                />
                {
                    todo.completed ? <del className='d-block'>{todo.todoText}</del> :
                        <input
                            type="text"
                            className="form-control me-2 todo-text"
                            value={todoText}
                            onChange={(e) => setTodoText(e.target.value)}
                            readOnly={!isEditable}
                        />
                }


                {/* Edit, Save Button */}
                {
                    isEditable ?
                        <button
                            className={`save-button bg-danger text-white me-1 inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 shrink-0 ${todo.completed ? "disabled" : ""}`}
                            onClick={() => handleUpdateTodo(todoText, todo.id)}
                            disabled={todo.completed}
                        >
                            Save
                        </button>
                        :
                        <button
                            type='button'
                            className={`save-button ms-auto bg-danger text-white me-1 inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 shrink-0 ${todo.completed ? "disabled" : ""}`}
                            onClick={handleEditTodo}
                            disabled={todo.completed}
                        >
                            Edit
                        </button>
                }

                {/* Delete Todo Button */}
                <button
                    className={`delete-button bg-success text-white inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 shrink-0 ${todo.completed ? "disabled" : ""}`}
                    onClick={() => handleDeleteTodo(todo.id)}
                    disabled={todo.completed}
                >
                    Delete
                </button>
            </div>
        </>
    )
}

export default TodoItem
