import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Form({ getTasks }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    axios
      .post('http://localhost:8000/tasks', {
        title,
        priority,
      })
      .then(() => {
        setTitle('');
        setPriority('low');
        getTasks();
        toast.success('Задача добавлена!');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Новая задача..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Низкая</option>
        <option value="medium">Средняя</option>
        <option value="high">Высокая</option>
      </select>
      <button type="submit">Добавить</button>
    </form>
  );
}

export default Form;
