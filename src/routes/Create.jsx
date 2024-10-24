import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function Create() {
  //api url
  const apiURL = 'http://localhost:3000/api/skateboards/create';
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  // State for handling image file
  const [imageFile, setImageFile] = useState(null);

  // Function to handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files);
  };

  const addSkateboard = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('brand', data.brand);
    formData.append('modelName', data.modelName);
    formData.append('size', data.size);
    formData.append('style', data.style);
    if (imageFile) {
      formData.append('image', imageFile[0]);
    }
    
    async function postData() {
      const response = await fetch(apiURL, {
        method: 'POST',
        body: formData,
      });
      if(response.ok) {
        window.location.href = '/';
      } else {
        //To-do: handle error
      }
    }
    postData();
  };

  return (
    <>
      <h1>Add a board to the collection!</h1>
      <form onSubmit={handleSubmit(addSkateboard)} method="post" encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input {...register("brand", { required: true, maxLength: 100 })} type="text" className="form-control bg-light" />
          {errors.brand && <span className="text-danger">Brand is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Name of Model</label>
          <input {...register("modelName", { required: true, maxLength: 100 })} type="text" className="form-control bg-light" />
          {errors.modelName && <span className="text-danger">Model name is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Size</label>
          <input {...register("size")} type="text" className="form-control bg-light" />
          {errors.size && <span className="text-danger">Board size is required!</span>}
        </div>
        <div>
          <label className="form-label">Style</label>
          <input {...register("style", { required: true, maxLength: 100 })} type="text" className="form-control bg-light" />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input {...register("image")} type="file" className="form-control bg-light" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
        <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
      </form>
    </>
  );
}
