import { Link } from 'react-router-dom';

export default function Card(props) {
  return (
    <div className="card mt-3">
      <div className="card-body d-flex flex-column align-items-center">
        <img
          src={`${props.apiHost}/images/${props.skateboard.filename}`}
          className="thumbnail"
          alt={`${props.skateboard.brand} ${props.skateboard.modelName}`}
        />
        <div className="skateboard-info text-center mt-3">
          <h4 className="card-title">{`${props.skateboard.brand} ${props.skateboard.modelName}`}</h4>
          <p className="card-text">
            Size: {props.skateboard.size} <br />
            Style: {props.skateboard.style}
          </p>
        </div>
        {props.showLinks && (
          <div className="mt-3">
            <Link to={`/update/${props.skateboard.id}`} className="btn btn-light btn-sm">
              <i className="bi bi-pencil-square"></i>
            </Link>
            &nbsp;
            <Link to={`/delete/${props.skateboard.id}`} className="btn btn-light btn-sm">
              <i className="bi bi-trash"></i>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
