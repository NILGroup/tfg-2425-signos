import React, { useState } from "react";

const VISSE_BACKEND_URL = 'https://garciasevilla.com/visse/backend/'


const UploadImage = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleFileUpload = () => {
        const image = new FormData();
        image.append('image', selectedFile);
        // Send selected image to Visse
        fetch(VISSE_BACKEND_URL + 'recognize', {
            method: 'POST',
            body: image,
        })
        .then(response => response.json())
        .then(response => console.log(response))
        // VER COMO MANEJAR ERRORES
        .catch(error => console.error('Error uploading file:', error)); 
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