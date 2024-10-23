import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Read() {
  const { id } = useParams();

  // Store the result from the API
  const [skateboard, setSkateboard] = useState(null);

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      const url = 'http://localhost:3000/api/skateboards/get/' + id;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (!ignore) {
          setSkateboard(data);
        }
      } else {
        setSkateboard(null);
      }
    }

    let ignore = false;
    fetchData();
    return () => {
      ignore = true;
    };
  }, []); // Run only once

  return (
    <>
      <h1>Read page for { id }</h1>
      {
        skateboard ?
        <div>{ skateboard.brand + ' ' + skateboard.modelName } </div> :
        <div>Skateboard not found.</div>
      }
    </>
    )
}