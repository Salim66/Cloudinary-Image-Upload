import axios from 'axios';
import React, { useState } from 'react';
import Pre from '../component/Pre/Pre';

const Upload = () => {
    const [postPhotos, setPostPhotos] = useState([]);
    const [loader, setLoader] = useState(false);
    const [images, setImages] = useState([]);

    const handlePostPhotoUpload = (e) => {
        const uploadImages = Array.from(e.target.files);
        setPostPhotos((prevState) => ([...prevState, ...uploadImages]));
    }

    const handlePreviewDelete = (item) => {
        const updatedImage = postPhotos.filter((data) => data !== item);
        setPostPhotos(updatedImage);
    }

    const handlePostPhotosUpload = (e) => {
        e.preventDefault();

        setLoader(true);

        const data = new FormData();
        let count = 1;
        postPhotos.forEach((item) => {
            data.append('file', item);
            data.append('upload_preset', "image_upload");
            data.append('cloud_name', "deist90as");

            // axios.delete(`https://api.cloudinary.com/v1_1/deist90as/image/destroy?public_id=${id}`)

            axios.post('https://api.cloudinary.com/v1_1/deist90as/image/upload', data)
            .then(res => {
                
                setImages((prevState) => [
                    ...prevState,
                    {
                        name: res.data.original_filename,
                        url: res.data.url,
                        secure_url: res.data.secure_url,
                        public_id: res.data.public_id
                    }
                ]);
                
                if (count >= postPhotos.length) {
                    setPostPhotos([]);
                    setLoader(false);
                }
                    
                count++;
                console.log(res.data);
            }).catch(err => {
                console.log(err.message);
            });

        })

    }
    
    return (
        <div className="container my-5">
            {loader && <Pre />}
            <div className="row justify-content-center my-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <input type="file" onChange={handlePostPhotoUpload} multiple />
                        </div>
                    </div>
                </div>
                <form onSubmit={handlePostPhotosUpload}>
                    <div className="row justify-content-center my-5">
                        {postPhotos.map((item, index) => {
                            const imageUrl = URL.createObjectURL(item);
                            return (
                                <div className="col-md-3" key={index}>
                                    <div className="card">
                                        <img src={ imageUrl } alt="" />
                                        <div className="card-footer">
                                            <button type='button' onClick={() => handlePreviewDelete(item)} className='btn btn-danger btn-sm'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) }
                        
                    </div>
                    <button type='submit' className='btn btn-primary btn-sm'>Upload</button>
                </form>
            </div>
        </div>
    )
};

export default Upload;