'use client';

import React, { useState } from 'react';
import Sidebar from './ui/Sidebar';
import Main from './ui/Main';
import Player from './ui/Player';

const Home = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const user = 'finnchantler'; // Replace with the actual username

  const handleSelectFolder = (folderId) => {
    setSelectedFolder(folderId);
  };

  return (
    <div className="container">
      <Sidebar user={user} onSelectFolder={handleSelectFolder} />
      <div className="main-content">
        {/* Pass the selectedFolder prop to Main */}
        <Main user={user} folderId={selectedFolder} />
        <Player />
      </div>
    </div>
  );
};

export default Home;
