import React, { useEffect, useState } from 'react'
import { TodoProvider } from './Contexts/TodoContext';
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'

const App = () => {
    const [todos, setTodos] = useState([])

    const addTodo = (todo) => {
        setTodos((prev) => [...prev, { id: Date.now(), ...todo }])
    }

    const updateTodo = (id, updatedTodo) => {
        setTodos((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updatedTodo } : item))
        );
    }


    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((item) => item.id !== id))
    }

    const toggleComplete = (id) => {
        setTodos((prev) => prev.map((item) => item.id === id ? { ...item, completed: !item.completed } : item))
    }

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"))

        if (todos && todos.length > 0) {
            setTodos(todos)
        }
    }, [])

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos))
        }
    }, [todos])



    return (
        <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {
                            todos.map((todo) => (
                                <div className='w-full' key={todo.id}>
                                    <TodoItem todo={todo} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </TodoProvider>
    )
}

export default App
