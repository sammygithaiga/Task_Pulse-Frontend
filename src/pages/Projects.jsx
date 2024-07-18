import React from 'react';

const ProjectsPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-psd/black-texture-background_1129635-1241.jpg?ga=GA1.1.2047667343.1720784022&semt=sph')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Projects Page</h1>
        <p className="text-lg text-gray-700 text-center mb-8">This is where your projects content goes.</p>
        {/* Add your projects content here */}
      </div>
    </div>
  );
};

export default ProjectsPage;
