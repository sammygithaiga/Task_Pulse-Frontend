import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Modal, Button, Form } from 'react-bootstrap';
import { SERVER_URL } from '../../utils';
import 'bootstrap/dist/css/bootstrap.min.css';

const TasksPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState({ title: '', description: '', due_date: '', priority: '', status: 'Pending', project_id: 1 });
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`${SERVER_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setTasks(data.tasks);
      setFilteredTasks(data.tasks);
    })
    .catch((error) => {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    });
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!taskDetails.title || !taskDetails.description || !taskDetails.due_date || !taskDetails.priority || !taskDetails.status || !taskDetails.project_id) {
      toast.error('Please fill in all fields');
      return;
    }

    fetch(`${SERVER_URL}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(taskDetails),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then((newTask) => {
      toast.success('Task created successfully');
      setTasks([...tasks, newTask.task]);
      handleFilter(filter, [...tasks, newTask.task]);
      handleClose();
    })
    .catch((error) => {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    });
  };

  const handleDelete = (taskId) => {
    fetch(`${SERVER_URL}/task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      if (response.ok) {
        toast.success('Task deleted successfully');
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        handleFilter(filter, updatedTasks);
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch((error) => {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    });
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
        <div className="mb-4">
          <Button variant="secondary" onClick={() => handleFilter('All')}>All</Button>
          <Button variant="secondary" onClick={() => handleFilter('Pending')}>Pending</Button>
          <Button variant="secondary" onClick={() => handleFilter('Completed')}>Completed</Button>
        </div>
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id} className="mb-2 p-2 bg-gray-100 rounded shadow-md">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <p>Due Date: {task.due_date}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>
              <Button variant="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
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
              <Form.Control type="text" name="title" value={taskDetails.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={taskDetails.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" name="due_date" value={taskDetails.due_date} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Control type="text" name="priority" value={taskDetails.priority} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" name="status" value={taskDetails.status} onChange={handleChange}>
                <option>Pending</option>
                <option>Completed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project ID</Form.Label>
              <Form.Control type="number" name="project_id" value={taskDetails.project_id} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TasksPage;
