import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '../ui/Card.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Home() {
  // Store the result from API
  const [skateboards, setSkateboards] = useState([]); // Initialize as an empty array

  // Separated into two variables for images
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/skateboards/all';

  // Get contacts from API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/skateboards/all');
        if (response.ok) {
          const data = await response.json();
          console.log("Data fetched:", data);
          setSkateboards(data);
        } else {
          console.error("Failed to fetch skateboards:", response.status);
          console.log("Response body:", await response.text());
          setSkateboards(null);
        }
      } catch (error) {
        console.error('Error fetching skateboards:', error);
        setSkateboards(null);
      }
    }
    fetchData();
  }, []); // run only once

  if (skateboards === null) {
    return <p>Loading...</p>; // Show a loading state while fetching data
  }

  return (
    <>
      <h1>Dylan's Skate Shop</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link to="/create" className="btn btn-outline-secondary">Add a New Skateboard</Link>
      </div>
      <div className="card-row">
      {
        skateboards.length > 0 ?
          skateboards.map(skateboard => (
            <Card key={skateboard.id} skateboard={skateboard} apiHost={apiHost} showLinks={true} />
          )) : 
          <p>No skateboards. Bummer.</p>
      }
      </div>
    </>
  );
}
