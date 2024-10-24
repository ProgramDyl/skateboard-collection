import { Link } from 'react-router-dom';

export default function Card(props) {
    return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="d-flex align-items-center position-relative">
          <img src={`${props.apiHost}/images/${props.skateboard.filename}`} className="thumbnail" />

          <div className="skateboard-info">
            <h4 className="card-title">{props.skateboard.brand + ' ' + props.skateboard.modelName}</h4>
            <p className="card-text">
              Size: {props.skateboard.size} <br />Style: {props.skateboard.style}
            </p>
          </div>

          {props.showLinks && 
            <div className="position-absolute top-0 end-0" style={{ border: '1px solid red', padding: '5px' }}>
              <Link to={`/update/${props.skateboard.id}`} className="btn btn-light btn-sm"><i className="bi bi-pencil-square"></i></Link>&nbsp;
              <Link to={`/delete/${props.skateboard.id}`} className="btn btn-light btn-sm"><i className="bi bi-trash"></i></Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
