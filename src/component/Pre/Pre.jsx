import React from 'react';
import { ClipLoader } from 'react-spinners';
import './Pre.css';

const Pre = () => {
    return (
        <div className="clip-wraper">
            <div className="clip-content">
                <ClipLoader color="#000" />
                <p>Uploading...</p>
            </div>
        </div>
    )
};

export default Pre;