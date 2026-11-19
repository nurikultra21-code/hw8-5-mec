import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/Form';
import Task from './components/Task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    axios.get('http://localhost:8000/tasks').then((res) => {
      setTasks(res.data);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="app">
      <h1>Список задач</h1>
      <Form getTasks={getTasks} />
      <div className="tasks-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} getTasks={getTasks} />
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
