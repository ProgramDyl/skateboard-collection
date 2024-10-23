import { Link } from 'react-router-dom';

export default function Card(props) {
  const { skateboard, apiHost, showLinks } = props;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center position-relative">
          <img
            src={`${apiHost}/images/${skateboard.filename}`}
            className="thumbnail"
            alt={`${skateboard.modelName} by ${skateboard.brand}`}
          />
          <div className="contact-info">
            <h4 className="card-title">
              {skateboard.brand + ' ' + skateboard.modelName}
            </h4>
            <p className="card-text">
              Size: {skateboard.size} <br />
              Style: {skateboard.style}
            </p>
          </div>
          {showLinks && (
            <div className="position-absolute top-0 end-0" style={{ border: '1px solid red', padding: '5px' }}>
              <Link to={`/update/${skateboard.id}`} className="btn btn-light btn-sm">
                <i className="bi bi-pencil-square"></i>
              </Link>
              &nbsp;
              <Link to={`/delete/${skateboard.id}`} className="btn btn-light btn-sm">
                <i className="bi bi-trash"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
