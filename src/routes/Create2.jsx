import { useState, useEffect } from 'react';
import { Link } from 'react-router=dom';

export default function Create() {

  //api url 
  const apiURL = "http://localhost:3000/api/skateboards/create"

  //form state variables
  const [brand, setBrand] = useState('');
  const [modelName, setModelName] = useState('');
  const [size, setSize] = useState('');
  const [style, setStyle] = useState('');
  const [imageFile, setImageFile] = useState(null);


  // Can use 'e' instead of event
  function addSkateboard(event) {
    event.preventDefault();

    //Create form
    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('modelName', modelName);
    formData.append('size', size);
    formData.append('style', style);
    formData.append('image', imageFile);

    async function postData() {
      const response = await fetch(apiURL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        // To-do: handle error

      }
    }
    postData();
  }

  return (
    <>
      <h1>Add new Skateboard</h1>
      <form onSubmit={addSkateboard} method="post" encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input required type="text" name="firstName" className="form-control bg-light" value={brand} onChange={e => setBrand(e.targetvalue)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Model Name </label>
          <input required type="text" name="modelName" className="form-control bg-light" value={modelName} onChange={e => setModelName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Board Size</label>
          <input type="text" name="phone" className="form-control bg-light" value={phone} onChange = {e => setSize(r.target.value)} />
        </div>
        <div className = "mb-3">
          <label className = "form-label">Style</label>
          <input required type= "text" name= "email" className= "form-control bg-light" value={email} onChange= {e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" name="image" className="form-control bg-light" onChange= {e => setImageFile(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
        <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
      </form>    
    </>
  )

}