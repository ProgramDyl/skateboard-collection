import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function Create() {
    //Skateboard-API url
    const apiURL = import.meta.env.VITE_API_HOST + 'api/skateboards/create';

    //form state variables
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [brand, setBrand] = useState('');
    const [modelName, setModelName] = useState('');
    const [size, setSize] = useState('');
    const [style, setStyle] = useState('');
    const [filename, setFilename] = useState('');

    function addSkateboard(data) {

        console.log(data);

        //Create form data
        const formData = new FormData();
        formData.append('brand', data.brand);
        formData.append('modelName', data.modelName);
        formData.append('size', data.size);
        formData.append('style', data.style);
        formData.append('image', data.filename[0]);

        async function postData() {
            const response = await fetch(apiURL, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                window.location.href = '/';
            } else {
                //TODO: handle error
            }
        }
        postData();
    }
    return (
        <>
            <h1>Add New Skateboard!</h1>
            <form onSubmit={handleSubmit(addSkateboard)} method="post" encType="multipart/form-data">
                <div>
                    <label className="form-label">Brand</label>
                    <input {...register("brand", { required: true, maxLength: 100 })} type="text" className="form-control bg-light" value={brand} onChange={e => setBrand(e.target.value)} />
                    {errors.brand && <span className="text-danger">Brand is required.</span>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Name of Model</label>
                    <input {...register("modelName", { required: true, maxLength: 100 })} type="text" className="form-control bg-light" value={modelName} onChange={e => setModelName(e.target.value)} />
                    {errors.modelName && <span className="text-danger">Model name is required.</span>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Size</label>
                    <input {...register("size")} type="text" className="form-control bg-light" value={size} onChange={e => setSize(e.target.value)}/>
                    {errors.size && <span className="text-danger">Board size is required!</span>}
                </div>

                <div>
                    <label className="form-label">Style</label>
                    <input {...register("style", {required: true, maxLength: 100 })} type="text" className="form-control bg-light" value={style} onChange={e => setStyle(e.target.value)}/>
                </div>
            
                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input {...register("Image", { required: true, maxLength: 100 })} type="text" className="form-control bg-light" onChange={e => setFilename(e.target.files[0])} />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
                <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
            </form>
        </>

    )
}