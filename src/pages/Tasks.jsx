import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SERVER_URL } from '../../utils';

const TasksPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState({ name: '', description: '', status: 'Pending' });
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/tasks`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // JWT token
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { tasks } = await response.json(); // Adjust according to your backend response
        setTasks(tasks);
        setFilteredTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${SERVER_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // JWT token
        },
        body: JSON.stringify(taskDetails),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success('Task created successfully');
      const newTask = await response.json(); // Adjust according to your backend response
      setTasks((prevTasks) => [...prevTasks, newTask]);
      handleFilter(filter, [...tasks, newTask]);
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
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // JWT token
        },
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
    <div
      className="min-h-screen flex flex-col items-center font-serif"
      style={{
        backgroundImage: `url('https://image.shutterstock.com/image-photo/abstract-black-scene-one-cylinder-260nw-2306875853.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Toaster position="top-right" />
      <div className="w-full max-w-6xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg mt-8">
        <div className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-t-lg shadow-md">
          <h1 className="text-4xl font-bold">Tasks Page</h1>
          <Button
            variant="primary"
            onClick={handleShow}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Task
          </Button>
        </div>
        <div className="flex justify-around mb-4">
          <Button
            variant={filter === 'All' ? 'dark' : 'outline-secondary'}
            onClick={() => handleFilter('All')}
            className="mr-2"
          >
            All
          </Button>
          <Button
            variant={filter === 'Pending' ? 'dark' : 'outline-secondary'}
            onClick={() => handleFilter('Pending')}
            className="mr-2"
          >
            Pending
          </Button>
          <Button
            variant={filter === 'Ongoing' ? 'dark' : 'outline-secondary'}
            onClick={() => handleFilter('Ongoing')}
            className="mr-2"
          >
            Ongoing
          </Button>
          <Button
            variant={filter === 'Completed' ? 'dark' : 'outline-secondary'}
            onClick={() => handleFilter('Completed')}
            className="mr-2"
          >
            Completed
          </Button>
        </div>
        <table className="w-full bg-white bg-opacity-80 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="border px-4 py-2">Number</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={task.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{task.name}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">{task.status}</td>
                <td className="border px-4 py-2">
                  <Button variant="danger" onClick={() => handleDelete(task.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-100">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTaskName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={taskDetails.name}
                onChange={(e) => setTaskDetails((prevDetails) => ({ ...prevDetails, name: e.target.value }))}
                required
                className="rounded-md"
              />
            </Form.Group>
            <Form.Group controlId="formTaskDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task description"
                value={taskDetails.description}
                onChange={(e) => setTaskDetails((prevDetails) => ({ ...prevDetails, description: e.target.value }))}
                required
                className="rounded-md"
              />
            </Form.Group>
            <Form.Group controlId="formTaskStatus" className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={taskDetails.status}
                onChange={(e) => setTaskDetails((prevDetails) => ({ ...prevDetails, status: e.target.value }))}
                required
                className="rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 bg-teal-600 hover:bg-teal-700 text-white">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TasksPage;
