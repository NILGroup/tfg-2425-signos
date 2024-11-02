import React, { useState } from "react";

const VISSE_BACKEND_URL = 'https://garciasevilla.com/visse/backend/'

const responseToSignotation = (response) => {
    response['explanations'].forEach((elem) => {
        if (elem['hand']) { // Hand elem is not null
            elem['hand']['fingers'].forEach((finger) => {
                switch(finger){
                    case 0:
                        
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                }
            })
        }
    })
}

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
        .then(response => {
            response.json()
        })
        .then(response => {
            console.log(response)
            const signotation = responseToSignotation(response)
            //console.log(signotation)
        })
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