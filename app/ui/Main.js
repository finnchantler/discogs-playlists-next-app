'use client';

import React, { useEffect, useState } from 'react';

const Main = ({ user, selectedFolder }) => {
  const [releases, setReleases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedFolder) return; // Skip fetching if no folder is selected

    const fetchReleases = async () => {
      try {
        console.log('Fetching releases for user:', user, 'and folder:', selectedFolder);

        const response = await fetch(`/api/collection/releases?user=${user}&folder=${selectedFolder}`);
        console.log('API response:', response);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Parsed data:', data);

        if (Array.isArray(data.releases)) {
          setReleases(data.releases);
        } else {
          throw new Error('Invalid data structure: releases is not an array');
        }

        console.log('Updated releases state:', data.releases);
      } catch (error) {
        console.error('Error fetching releases:', error);
        setError(error.message);
      }
    };

    fetchReleases();
  }, [user, selectedFolder]);

  // Display error or loading state if needed
  if (error) {
    return (
      <div className="main">
        <h2>Releases</h2>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (releases.length === 0) {
    return (
      <div className="main">
        <h2>Releases</h2>
        <p>No releases available.</p>
      </div>
    );
  }

  return (
    <div className="main">
      <h2>Releases</h2>
      <ul>
        {releases.map((release) => (
          <li key={release.id}>
            {release.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
