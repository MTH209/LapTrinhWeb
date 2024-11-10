import '../style.css';
import { format } from 'date-fns';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

const ToDoItem = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(props.title);
    const [newDueDate, setNewDueDate] = useState(props.dueDate);

    const dueDateFormat = format(new Date(props.dueDate), 'dd MMMM yyyy HH:mm');

    const handleEdit = () => {
        if (isEditing) {

            props.onUpdate({ title: newTitle, dueDate: newDueDate });
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="ToDoItem">
            <input type="checkbox" />
            <div className="ItemContent">
                {isEditing ? (
                    <>
                        <input
                            className="TitleInput"
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <input
                            className="DateInput"
                            type="datetime-local"
                            value={new Date(newDueDate).toISOString().slice(0, -8)}
                            onChange={(e) => setNewDueDate(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <p className="Title">{props.title}</p>
                        <p className="DueDate">{dueDateFormat}</p>
                    </>
                )}
            </div>
            <div className="Action">
                <EditOutlined onClick={handleEdit} style={{ marginRight: '10px' }} />
                <DeleteOutlined onClick={() => props.onDelete(props.id)} />
            </div>
        </div>
    );
};

export default ToDoItem;
