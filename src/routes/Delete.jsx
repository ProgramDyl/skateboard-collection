import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '../ui/Card';

export default function Delete() {
  const { id } = useParams();
  const navigate = useNavigate(); // For navigation after deletion
  const [skateboard, setSkateboard] = useState(null);
  const apiHost = import.meta.env.VITE_API_HOST;
  const getUrl = `${apiHost}/api/skateboards/get/${id}`;
  const deleteUrl = `${apiHost}/api/skateboards/delete/${id}`; // Adjust for your API endpoint

  useEffect(() => {
    async function fetchSkateboard() {
      try {
        const response = await fetch(getUrl);
        if (response.ok) {
          const data = await response.json();
          setSkateboard(data);
        } else {
          setSkateboard(null);
        }
      } catch (error) {
        setSkateboard(null);
        console.error('Error fetching skateboard:', error);
      }
    }
    fetchSkateboard();
  }, [getUrl]);

  const handleDelete = async () => {
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
      if (response.ok) {
        navigate('/'); // Redirect to home page after deletion
      } else {
        console.error('Failed to delete skateboard:', response.status);
      }
    } catch (error) {
      console.error('Error deleting skateboard:', error);
    }
  };

  return (
    <>
      <h1>Remove Skateboard</h1>
      <h2>Are you sure you want to remove this skateboard?</h2>
     
      {skateboard && <Card skateboard={skateboard} apiHost={apiHost} />}

      <p>
        <button className="btn btn-danger" onClick={handleDelete}>Yes</button> <Link to="/" className="btn btn-outline-secondary">Cancel</Link>
      </p>
    </>
  );
}
