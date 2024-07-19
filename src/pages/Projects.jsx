import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Modal, Button, Form } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectDetails, setProjectDetails] = useState({ name: '', description: '', status: 'Pending' });
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Mock fetching projects from an API
    fetch('/api/projects')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
      });
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Mock API call
    fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectDetails),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Project created successfully');
          const newProject = { ...projectDetails, id: projects.length + 1 };
          setProjects([...projects, newProject]);
          handleFilter(filter, [...projects, newProject]);
          handleClose();
        } else {
          toast.error('Failed to create project');
        }
      })
      .catch((error) => {
        console.error('Error creating project', error);
        toast.error('Failed to create project');
      });
  };

  const handleDelete = (projectId) => {
    fetch(/api//$`{projectId}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          toast.success('Project deleted successfully');
          const updatedProjects = projects.filter((project) => project.id !== projectId);
          setProjects(updatedProjects);
          handleFilter(filter, updatedProjects);
        } else {
          toast.error('Failed to delete project');
        }
      });
  };

  const handleFilter = (status, projectsList = projects) => {
    if (status === 'All') {
      setFilteredProjects(projectsList);
    } else {
      setFilteredProjects(projectsList.filter((project) => project.status === status));
    }
    setFilter(status);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center font-serif"
      style={{
        backgroundImage: url('https://image.shutterstock.com/image-photo/abstract-black-scene-one-cylinder-260nw-2306875853.jpg'),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Toaster position="top-right" />
      <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-lg mt-8">
        <div className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-t-lg shadow-md">
          <h1 className="text-4xl font-bold">Projects Page</h1>
          <Button
            variant="primary"
            onClick={handleShow}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Project
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
            {filteredProjects.map((project, index) => (
              <tr key={project.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{project.name}</td>
                <td className="border px-4 py-2">{project.description}</td>
                <td className="border px-4 py-2">{project.status}</td>
                <td className="border px-4 py-2">
                  <Button variant="danger" onClick={() => handleDelete(project.id)}>
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
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-100">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProjectName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={projectDetails.name}
                onChange={(e) => setProjectDetails({ ...projectDetails, name: e.target.value })}
                required
                className="rounded-md"
              />
            </Form.Group>
            <Form.Group controlId="formProjectDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project description"
                value={projectDetails.description}
                onChange={(e) => setProjectDetails({ ...projectDetails, description: e.target.value })}
                required
                className="rounded-md"
              />
            </Form.Group>
            <Form.Group controlId="formProjectStatus" className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={projectDetails.status}
                onChange={(e) => setProjectDetails({ ...projectDetails, status: e.target.value })}
                required
                className="rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 bg-teal-600 hover:bg-blue-700 text-white">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProjectsPage;