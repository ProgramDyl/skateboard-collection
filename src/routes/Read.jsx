import { useParams } from 'react-router-dom';

export default function Read() {
  const { id } = useParams();
  return(
    <h1>Read for for {id}</h1>
  )
}