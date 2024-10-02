import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, onEdit, onDelete }) => {
    return (
        <div className="todo-list" style={{ marginLeft: '10px' }}>
            <h1>My Work 🎯</h1>
            <div>
                <ToDoItem title="Gửi email nộp bài tập về nhà" dueDate="Hôm nay"></ToDoItem>
                <ToDoItem title="Học từ vựng tiếng anh mỗi ngày" dueDate="Ngày mai"></ToDoItem>
                <ToDoItem title="Viết tiểu luận môn Triết học" dueDate="Tuần tới"></ToDoItem>
            </div>
            <div>
                {todos.map((todo, index) => (
                    <ToDoItem 
                        key={index} 
                        title={todo.title} 
                        dueDate={todo.dueDate} 
                        onEdit={() => onEdit(index)}  // Gọi hàm onEdit khi nhấn biểu tượng chỉnh sửa
                        onDelete={() => onDelete(index)} // Gọi hàm onDelete khi nhấn biểu tượng xóa
                    />
                ))}
            </div>
        </div>
    );
};

export default ToDoList;
