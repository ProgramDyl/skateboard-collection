import { useParams } from "react-router-dom";
import Card from '../ui/Card';
export default function Delete() {
    const { id } = useParams();

    return (
        <h1>Delete for { id }</h1>
    )
}