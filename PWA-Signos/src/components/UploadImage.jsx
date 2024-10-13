import React, { useState } from "react";

const UploadImage = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        //Using localhost to send the file to the Service Worker
        fetch('http://localhost:5173/', { method: 'POST', formData })
        .then(console.log('File uploaded successfully'))
    }

    return (
        <>
            <input type='file' accept='image/*' max={1} onChange={handleFileSelect}/>
            <button className='upload-image-button' onClick={handleFileUpload}>
                Upload Image
            </button>
        </>
        
    );
}

export default UploadImage;