import { Link } from 'react-router-dom';

export default function Card(props) {
    const { skateboard, apiHost, showLinks } = props;

    <div className="card mt-3 mb-2">
        <div className="card-body">
            <div className="d-flex align-items-center position-relative">
                <img src= {`${apiHost}/images/${props.skateboard.filename}`} className="thumbnail" />

                <div className="skateboard-info">
                    <h5 className="card-title">{ props.skateboard.brand + ' ' + props.skateboard.modelName}</h5>
                    <p className="card-text">
                        { props.skateboard.size }<br />{props.skateboard.style}
                    </p>
                </div>

                <div className="position-absolute top-0 end-0">
                    <Link to={`/update/${props.skateboard.id}`} class name="btn btn-light btn-sm"><i className="bi bi-pencil"></i></Link>&nbsp;
                    <Link to={`/delete/${props.skateboard.id}`} class name="btn btn-light btn-sm"><i className="bi bi-pencil"></i></Link>
                </div>                
            </div>
        </div>
    </div>
}