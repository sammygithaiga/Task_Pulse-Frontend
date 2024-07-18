import React from 'react';

const Tasks = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/02/47/63/84/240_F_247638494_siPMHtu9N47d4n8dktxoOcLXNHuzAQHs.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Tasks Page</h1>
        <p className="text-lg text-gray-700 text-center mb-8">This is where your tasks content goes.</p>
      </div>
    </div>
  );
};

export default Tasks;
