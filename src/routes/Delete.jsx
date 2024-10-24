import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '../ui/Card';

export default function Delete() {
    const { id } = useParams();

    // Store result from API
    const [skateboard, setSkateboard] = useState(null);

    const apiHost = import.meta.env.VITE_API_HOST;
    const getUrl = apiHost + 'api.skateboards/get' + id;
    // To-Do: const deleteUrl

    //GET the contact to delete
    useEffect(() => {
        //Fetch data from API
        async function fetchSkateboard() {
            const response = await fetch(getUrl);
            if(response.ok){
                const data = await response.json();
                if (!ignore) {
                    setSkateboard(data);
                }
            } else {
                setSkateboard(null);
            }
        }

        let ignore = false;
        fetchSkateboard();
        return () => {
            ignore = true;
        }
    }, []);

    return (
        <>
        <h1>Remove Skateboard</h1>
        <h2>Are you sure you want to remove this board?</h2>

        { skateboard && <Card skateboard={skateboard} apiHost={apiHost} showLinks={false} />}

        <p>
            <button className="btn btn-danger">Yes</button> <Link to="/" className="btn btn-outline-secondary">Cancel</Link>
        </p>
        </>
    )
}