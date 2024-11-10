import React, { useState, useEffect } from 'react';
import ToDoItem from "../components/ToDoItem";
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:3000/api/todos')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
    }, []);

    const addTodo = () => {
    const newTodo = { title: "New Task", dueDate: "2024-10-10 09:00" };
    axios.post('http://localhost:3000/api/todos', newTodo)
        .then(response => {
            setTodos([...todos, response.data]);
        })
        .catch(error => console.error("Lỗi khi thêm dữ liệu:", error));
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:3000/api/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => console.error("Lỗi khi xóa dữ liệu:", error));
    };

    const updateTodo = (id, updatedData) => {
        axios.put(`/api/todos/${id}`, updatedData)
            .then(response => {
                setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
            })
            .catch(error => console.error("Lỗi khi cập nhật dữ liệu:", error));
    };
    

    return (
        <div className="ToDoList" style={{ marginLeft: '10px' }}>
            <h1>My work 🎯</h1>
            <div>
                {todos.map(todo => (
                    <ToDoItem
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        dueDate={todo.dueDate}
                        onDelete={() => deleteTodo(todo.id)}
                        onUpdate={(updatedData) => updateTodo(todo.id, updatedData)}
                    />
                ))}
            </div>
            <div
                style={{ marginTop: '5px', cursor: 'pointer' }}
                onClick={addTodo}
            >
                <PlusCircleOutlined style={{ fontSize: '20px', color: '#d1453b' }} /> Add Task
            </div>
        </div>
    );
    
};

export default ToDoList;

