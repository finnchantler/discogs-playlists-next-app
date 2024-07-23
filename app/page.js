'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      const response = await fetch('/api/collection');
      
      if (response.status === 401) {
        router.push('/login');
      } else {
        const data = await response.json();
        setCollection(data);
      }
      setLoading(false);
    };

    fetchCollection();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Collection</h1>
      <ul>
        {collection.map((item) => (
          <li key={item.id}>{item.basic_information.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
