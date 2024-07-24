import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Modal, Button, Form } from 'react-bootstrap';
import { SERVER_URL } from '../../utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';


const TasksPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: '',
    status: 'Pending',
    project_id: 1
  });
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data.tasks);
      setFilteredTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    }
  };

  const handleShow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to add a task');
    } else {
      setShowModal(true);
    }
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!taskDetails.title || !taskDetails.description || !taskDetails.due_date || !taskDetails.priority || !taskDetails.status || !taskDetails.project_id) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(taskDetails)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newTask = await response.json();
      toast.success('Task created successfully');
      setTasks([...tasks, newTask.task]);
      handleFilter(filter, [...tasks, newTask.task]);
      handleClose();
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${SERVER_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success('Task deleted successfully');
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      handleFilter(filter, updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleFilter = (status, tasksList = tasks) => {
    if (status === 'All') {
      setFilteredTasks(tasksList);
    } else {
      setFilteredTasks(tasksList.filter((task) => task.status === status));
    }
    setFilter(status);
  };

  return (

    <div className="min-h-screen flex flex-col items-center font-serif bg-gray-100">
      <Toaster position="top-right" />
      <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        <div className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-t-lg shadow-md">
          <h1 className="text-4xl font-bold">Tasks Page</h1>
          <button

    <div
      className="min-h-screen flex flex-col items-center font-serif bg-gray-100"
      style={{
        backgroundImage: `url('https://image.shutterstock.com/image-photo/abstract-black-scene-one-cylinder-260nw-2306875853.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Toaster position="top-right" />
      <div className="w-full max-w-4xl mx-auto p-6 bg-white bg-opacity-80 rounded-lg shadow-lg mt-8">
        <div className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-t-lg shadow-md">
          <h1 className="text-3xl font-bold">Tasks Page</h1>
          <Button
            variant="primary"

            onClick={handleShow}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Task
          </button>
        </div>

        <div className="mb-4 flex space-x-4">
          <button className={`px-4 py-2 rounded ${filter === 'All' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => handleFilter('All')}>All</button>
          <button className={`px-4 py-2 rounded ${filter === 'Pending' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => handleFilter('Pending')}>Pending</button>
          <button className={`px-4 py-2 rounded ${filter === 'Completed' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => handleFilter('Completed')}>Completed</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Due Date</th>
                <th className="py-2 px-4">Priority</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id} className="border-t">
                  <td className="py-2 px-4">{task.title}</td>
                  <td className="py-2 px-4">{task.description}</td>
                  <td className="py-2 px-4">{task.due_date}</td>
                  <td className="py-2 px-4">{task.priority}</td>
                  <td className="py-2 px-4">{task.status}</td>
                  <td className="py-2 px-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4 flex space-x-2">
          <Button variant="secondary" onClick={() => handleFilter('All')} className="bg-gray-200 text-gray-800 hover:bg-gray-300">All</Button>
          <Button variant="secondary" onClick={() => handleFilter('Pending')} className="bg-yellow-200 text-yellow-800 hover:bg-yellow-300">Pending</Button>
          <Button variant="secondary" onClick={() => handleFilter('Completed')} className="bg-green-200 text-green-800 hover:bg-green-300">Completed</Button>
        </div>
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-teal-700">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-gray-600">Due Date: {task.due_date}</p>
              <p className="text-gray-600">Priority: {task.priority}</p>
              <p className="text-gray-600">Status: {task.status}</p>
              <Button variant="danger" onClick={() => handleDelete(task.id)} className="mt-2">Delete</Button>
            </li>
          ))}
        </ul>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={taskDetails.title}
                onChange={handleChange}
                className="mb-3"
                placeholder="Enter task title"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={taskDetails.description}
                onChange={handleChange}
                className="mb-3"
                placeholder="Enter task description"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="due_date"
                value={taskDetails.due_date}
                onChange={handleChange}
                className="mb-3"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Control
                type="text"
                name="priority"
                value={taskDetails.priority}
                onChange={handleChange}
                className="mb-3"
                placeholder="Enter task priority"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={taskDetails.status}
                onChange={handleChange}
                className="mb-3"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project ID</Form.Label>
              <Form.Control
                type="number"
                name="project_id"
                value={taskDetails.project_id}
                onChange={handleChange}
                className="mb-3"
                placeholder="Enter project ID"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-full">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TasksPage;
