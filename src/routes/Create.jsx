import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function Create() {
  const apiURL = import.meta.env.VITE_API_HOST + '/api/skateboards/create';
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setValue('image', e.target.files[0], { shouldValidate: true });
  };

  const addSkateboard = async (data) => {
    const formData = new FormData();
    formData.append('brand', data.brand);
    formData.append('modelName', data.modelName);
    formData.append('size', data.size);
    formData.append('style', data.style);
    formData.append('image', image);

    const response = await fetch(apiURL, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      window.location.href = '/';
    } else {
      console.error('Failed to create skateboard');
    }
  };

  return (
    <>
      <h1>Add New Skateboard!</h1>
      <form onSubmit={handleSubmit(addSkateboard)} method="post" encType="multipart/form-data">
        <div>
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
          <input {...register("image", { required: true })} type="file" className="form-control bg-light" onChange={handleImageChange} />
          {image && <p>Selected file: {image.name}</p>}
          {errors.image && <span className="text-danger">Image is required.</span>}
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
        <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
      </form>
    </>
  );
}
