import React from 'react';

const Home = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://t4.ftcdn.net/jpg/02/98/58/41/240_F_298584167_WLdKSUF4ZpQxLe4dX1div4tvC41Nd9N0.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome to Your Home Page</h1>
        <p className="text-lg text-gray-700 text-center mb-8">This is where your content for the home page goes.</p>
      </div>
    </div>
  );
};

export default Home;
