import React, { useEffect, useRef, useState } from 'react';
import './Todo.css';

function Todo() {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editId, setEditId] = useState(0)

    const addToDos = () => {
        const inputElement = document.getElementById("input-field")
        var trimedToDo = todo.trim()
        if (trimedToDo !== '' && /^[a-zA-Z][a-zA-Z0-9\s\S]*$/.test(trimedToDo)) {
            inputElement.style.borderColor = '';
            inputElement.style.borderStyle = '';
            inputElement.placeholder = "Add a new task";
            inputElement.style.color = '';
            if (editId === 0) {
                setTodos([...todos, { id: Date.now(), text: todo, status: false }])
            }
            else {
                const updatedToDos = todos.map((to) =>
                    to.id === editId
                        ? { ...to, text: todo }
                        : to
                );
                setTodos(updatedToDos)
                setEditId(0)
            }
            setTodo('')
        } else {
            inputElement.style.borderColor = 'red';
            inputElement.style.borderStyle = 'solid';
            inputElement.placeholder = "Please enter any valid todo....";
            // inputElement.style.color = 'red';
        }

    }

    const deleteToDo = (id) => {
        setTodos(todos.filter((filteredToDo) => filteredToDo.id !== id))
        console.log(todos)
    }

    const completedToDo = (id) => {
        const updatedToDo = todos.map((current) => {
            if (current.id === id) {
                current.status = !current.status
            }
            return current
        })
        setTodos(updatedToDo)
    }

    const editToDo = (id) => {
        const editValue = todos.find((toDO) => toDO.id === id)
        setEditId(editValue.id)
        setTodo(editValue.text)
    }

    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus();
    })


    return (
        <div className='container'>
            <h1>Get Things Done</h1>
            <form className='mb-3 todo-form' onSubmit={handleSubmit}>
                <input onChange={(e) => (setTodo(e.target.value))} ref={inputRef} type="text" value={todo} id="input-field" placeholder="Enter a Todo" />
                <button className='btn btn-primary' onClick={addToDos}>{editId ? 'Edit' : "Add"}</button>
            </form>
            <div className='todo-list'>
                <h3>{todos.length >= 1 ? 'Your ToDos' : ""}</h3>
                <ul>
                    {
                        todos.map((todo) => {
                            return (
                                <li>
                                    <span id={todo.status ? 'todo-complete' : ''}>{todo.text}</span>
                                    <div className="icons">
                                        <i onClick={() => completedToDo(todo.id)} className="fa-solid fa-check" title='Completed?'></i>
                                        <i onClick={() => editToDo(todo.id)} className="fa-solid fa-pen-to-square" title='Edit ToDo'></i>
                                        <i onClick={() => deleteToDo(todo.id)} className="fa-solid fa-trash" title='Delete ToDo'></i>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Todo