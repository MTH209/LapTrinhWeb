import React, { useState } from 'react';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import { PlusCircleOutlined } from '@ant-design/icons';

function App() {
    const [todos, setTodos] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };

    const handleEdit = (index) => {
        const newTitle = prompt('Edit Task Title', todos[index].title); // Hiển thị prompt để chỉnh sửa tiêu đề
        const newDueDate = prompt('Edit Due Date', todos[index].dueDate); // Hiển thị prompt để chỉnh sửa ngày hết hạn
        if (newTitle && newDueDate) {
            const updatedTodos = todos.map((todo, i) => 
                i === index ? { ...todo, title: newTitle, dueDate: newDueDate } : todo
            );
            setTodos(updatedTodos); // Cập nhật danh sách công việc
        }
    };

    const handleDelete = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index); // Lọc bỏ công việc đã xóa
        setTodos(updatedTodos); // Cập nhật danh sách công việc
    };

    const handleAddTask = () => {
        setShowAddForm(true);
    };

    const handleCloseForm = () => {
        setShowAddForm(false);
    };

    return (
        <div className="App" style={{ padding: '20px' }}>
            <ToDoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
            {showAddForm && <AddToDo addTodo={addTodo} closeForm={handleCloseForm} />}
            <div style={{ marginTop: '10px', cursor: 'pointer' }} onClick={handleAddTask}>
                <PlusCircleOutlined style={{ fontSize: '20px', color: '#d1453b' }} />
                <span style={{ marginLeft: '5px' }}>Add Task</span>
            </div>
        </div>
    );
}

export default App;
