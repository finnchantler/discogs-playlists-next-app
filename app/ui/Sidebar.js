'use client';

import React, { useEffect, useState } from 'react';

const Sidebar = ({ user, onSelectFolder }) => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        console.log('Fetching folders for user:', user);

        const response = await fetch(`/api/collection/folders?user=${user}`);
        console.log('API response:', response);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Parsed data:', data);

        // Ensure data has folders property and it's an array
        if (Array.isArray(data.folders)) {
          setFolders(data.folders);
        } else {
          throw new Error('Invalid data structure: folders is not an array');
        }

        console.log('Updated folders state:', data.folders);
      } catch (error) {
        console.error('Error fetching folders:', error);
        setError(error.message);
      }
    };

    fetchFolders();
  }, [user]);

  // Debugging the current state and state setter function
  console.log('Current folders state:', folders);
  console.log('setFolders function:', setFolders);
  console.log('Error:', error);

  // Handling the case where folders might be undefined or not an array
  if (!Array.isArray(folders)) {
    return (
      <div className="sidebar">
        <h2>Collection Folders</h2>
        {error ? <p>Error: {error}</p> : <p>No folders available.</p>}
      </div>
    );
  }

  return (
    <div className="sidebar">
      <h2>Collection Folders</h2>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id} onClick={() => onSelectFolder(folder.id)}>
            {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
