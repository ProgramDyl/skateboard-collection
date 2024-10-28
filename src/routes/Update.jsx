import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { get, useForm } from 'react-hook-form';
import Card from '../ui/Card';

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [skateboard, setSkateboard] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const apiHost = import.meta.env.VITE_API_HOST; 
  const getUrl = `${apiHost}/api/skateboards/get/${id}`; 
  console.log('Fetching URL:', getUrl);
  const updateUrl = `${apiHost}/api/skateboards/update/${id}`;


  useEffect(() => {
    const getUrl = `${apiHost}/api/skateboards/${id}`;
    console.log('Fetching URL:', getUrl);
  
    async function fetchSkateboard() {
      try {
        const response = await fetch(getUrl);
        if (response.ok) {
          const data = await response.json();
          setSkateboard(data);

          // This pre-fills the form fields w the existing data
        for (const [key, value] of Object.entries(data)) {
            setValue(key, value);
        }
        } else {
          console.error('Error fetching skateboard:', response.status);
          setSkateboard(null);
        }
      } catch (error) {
        console.error('Error fetching skateboard:', error);
        setSkateboard(null);
      }
    }
    fetchSkateboard();
  }, [apiHost, id]);

  
  const handleImageChange = (e) => {
    setImageFile(e.target.files);
  };

  const handleUpdate = async (data) => {
    const formData = new FormData();

    // Add fields that are not empty
    if (data.brand) formData.append('brand', data.brand);
    if (data.modelName) formData.append('modelName', data.modelName);
    if (data.size) formData.append('size', data.size);
    if (data.style) formData.append('style', data.style);
    if (imageFile) formData.append('image', imageFile[0]);

    try {
      const response = await fetch(updateUrl, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        navigate('/'); 
      } else {
        console.error('Failed to update skateboard:', response.status);
      }
    } catch (error) {
      console.error('Error updating skateboard:', error);
    }
};

  const updateSkateboard = async (data) => {
    const formData = new FormData();
    
    // Add only the fields that have values
    if (data.brand) formData.append('brand', data.brand);
    if (data.modelName) formData.append('modelName', data.modelName);
    if (data.size) formData.append('size', data.size);
    if (data.style) formData.append('style', data.style);
    if (imageFile) formData.append('image', imageFile[0]);
  
    try {
      const response = await fetch(updateUrl, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        navigate('/'); 
      } else {
        console.error('Failed to update skateboard:', response.status);
      }
    } catch (error) {
      console.error('Error updating skateboard:', error);
    }
  };
  

  return (
    <>
      <h1>Update Skateboard</h1>
      {skateboard && (
  <>
    <Card skateboard={skateboard} apiHost={apiHost} />
    <form onSubmit={handleSubmit(handleUpdate)} method="post" encType="multipart/form-data">
  <div className="mb-3">
    <label className="form-label">Brand</label>
    <input {...register("brand", { maxLength: 100 })} type="text" className="form-control bg-light" />
  </div>
  <div className="mb-3">
    <label className="form-label">Name of Model</label>
    <input {...register("modelName", { maxLength: 100 })} type="text" className="form-control bg-light" />
  </div>
  <div className="mb-3">
    <label className="form-label">Size</label>
    <input {...register("size")} type="text" className="form-control bg-light" />
  </div>
  <div>
    <label className="form-label">Style</label>
    <input {...register("style", { maxLength: 100 })} type="text" className="form-control bg-light" />
  </div>
  <div className="mb-3">
    <label className="form-label">Image</label>
    <input {...register("image")} type="file" className="form-control bg-light" onChange={handleImageChange} />
  </div>
  <button type="submit" className="btn btn-primary">Update</button>
  <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
</form>

  </>
)}

    </>
  );
}
