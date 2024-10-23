import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Card from '../ui/Card';

export default function Home() {
  // Store the result from API
  const [skateboards, setSkateboards] = useState([]); // Initialize as an empty array

  // Separated into two variables for images
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/skateboards/all';

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        console.log('API data:', data); // Checking console for response from api
        if (!ignore) {
          setSkateboards(data); 
          console.log("Grabbed skateboards:", data);  
        }
      } else {
        console.error("Failed to grab skateboards.Bummer.");
      }
    }

    let ignore = false;
    fetchData();
    return () => {
      ignore = true;
    };
  }, [apiUrl]); // Run only once

  return (
    <>
      <h1>Dylan's Skate Shop</h1>
      <p>
        <Link to="/create" className="btn btn-outline-secondary">
          Add New Deck
        </Link>
      </p>
      {skateboards.length > 0 ? (
        skateboards.map((skateboard, index) => (
          <Card skateboard={skateboard} apiHost={apiHost} showLinks={true} key={index} />
        ))
      ) : (
        <p>No Skateboards.</p>
      )}
    </>
  );
}
