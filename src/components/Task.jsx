import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Task({ task, getTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newPriority, setNewPriority] = useState(task.priority);

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/tasks/${task.id}`).then(() => {
      getTasks();
      toast.error('Задача удалена');
    });
  };

  const handleSave = () => {
    if (!newTitle.trim()) return;

    axios
      .patch(`http://localhost:8000/tasks/${task.id}`, {
        title: newTitle,
        priority: newPriority,
      })
      .then(() => {
        setIsEditing(false);
        getTasks();
        toast.success('Задача обновлена!');
      });
  };

  const handleCancel = () => {
    setNewTitle(task.title);
    setNewPriority(task.priority);
    setIsEditing(false);
  };

  return (
    <div className={`task-card ${task.priority}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
          >
            <option value="low">Низкая</option>
            <option value="medium">Средняя</option>
            <option value="high">Высокая</option>
          </select>
          <div className="btn-group">
            <button onClick={handleSave} className="save-btn">
              Сохранить
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <div>
            <h2>{task.title}</h2>
            <span className="badge">Важность: {task.priority}</span>
          </div>
          <div className="btn-group">
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Редактировать
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
