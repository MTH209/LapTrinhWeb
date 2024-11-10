import React, { useState } from 'react';

const AddToDo = ({ addTodo, closeForm }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !dueDate) return; 
        addTodo({ title, dueDate });
        setTitle(''); 
        setDueDate(''); 
        closeForm(); 
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default AddToDo;