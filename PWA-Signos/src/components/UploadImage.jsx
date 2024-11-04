import React, { useState } from "react";

const VISSE_BACKEND_URL = 'https://garciasevilla.com/visse/backend/'
const SIGNARIO_URL = 'https://griffos.filol.ucm.es/signario'

const handToSignotation = (hand_params) => {
    let handSignotation = fingersToSignotation(hand_params['fingers'])
    handSignotation += ':' + handOrientation(hand_params['ori'], hand_params['rot'], hand_params['ref'])
    
    return handSignotation
}

const fingersToSignotation = (finger_params) => {
    if (finger_params.every(finger => finger === 'c')) //El puño cerrado.
        return "picam++";
    else if (finger_params.every(finger => finger === 'f')) //El índice recto, con el pulgar pegado. El resto de dedos estirados.
        return "pir-O";
    else if (finger_params.every(finger => finger === 't')) //El índice y el pulgar cruzados, el resto de dedos estirados.
        return "TE";
    else if (finger_params.every(finger => finger === 'x')) //Los dedos índice y corazón cruzados.
        return "CI";
    else if (finger_params.every(finger => finger === 's')) //La punta del índice tocando la falange del pulgar, el resto de dedos extendidos.
        return "pi-O";
    else {
        let fingers = ""
        let flex_mode = ""
        let contact = ""
        const extended = ['P', 'I', 'C', 'A', 'M']
        const curved = ['p', 'i', 'c', 'a', 'm']
        for (let i = 0; i < 5; i++){
            switch(finger_params[i][0]){
                case 'E':
                    fingers += extended[i];
                    break;
                case 'r':
                    fingers += curved[i];
                    flex_mode = 'r';
                    break;
                case 'g':
                    fingers += curved[i];
                    flex_mode = 'g';
                    break;
                default: //'c'
                    break;
            }
            if (finger_params[i].length > 1) {
                switch(finger_params[i][1]){
                    case '+':
                        contact = '+';
                        break;
                    case '-':
                        contact = '-';
                        break;
                }
            }
        }
        return fingers + flex_mode + contact;
    }
}

const handOrientation = (ori, rot, ref) => {
    let handOrientation = ''

    // Palm orientation
    if(ori === 'b'){
        handOrientation += 'F'; // Palm forward

        // Distal axis
        if(rot === 0 || rot === 1 || rot === 7){ // N, NE, NW
            handOrientation += 'h';
        }
        else if(rot === 2){ // E
            handOrientation += 'y';
        }
        else if (rot === 3 || rot === 4 || rot === 5){ // S, SE, SW
            handOrientation += 'l';
        }
        else if(rot === 6){ // W
            handOrientation += 'x';
        }
    }
    else if(ori === 'w'){
        handOrientation += 'B'; // Palm backwards

        // Distal axis
        if(rot === 0 || rot === 1 || rot === 7){
            handOrientation += 'h';
        }
        else if(rot === 2){
            handOrientation += 'y';
        }
        else if (rot === 3 || rot === 4 || rot === 5){
            handOrientation += 'l';
        }
        else if(rot === 6){
            handOrientation += 'x';
        }
    }
    else if(ori === 'h'){
        if(ref === false)
            handOrientation += 'X'; // Palm left
        else
            handOrientation += 'Y'; // Palm right

        // Distal axis
        if(rot === 0 || rot === 1 || rot === 7){
            handOrientation += 'h';
        }
        else if (rot === 3 || rot === 4 || rot === 5){
            handOrientation += 'l';
        }
        else {
            // No es posible
        }
    }
    else if(ori === 'hb'){
        handOrientation += 'L'; // Palm down

        // Distal axis
        if(rot === 0 || rot === 1 || rot === 7){
            handOrientation += 'f';
        }
        else if(rot === 2){
            handOrientation += 'y';
        }
        else if (rot === 3 || rot === 4 || rot === 5){
            handOrientation += 'b';
        }
        else if(rot === 6){
            handOrientation += 'x';
        }
    }
    else if(ori === 'hw'){
        handOrientation += 'H'; // Palm up

        // Distal axis
        if(rot === 0 || rot === 1 || rot === 7){
            handOrientation += 'f';
        }
        else if(rot === 2){
            handOrientation += 'y';
        }
        else if (rot === 3 || rot === 4 || rot === 5){
            handOrientation += 'b';
        }
        else if(rot === 6){
            handOrientation += 'x';
        }
    }
    else if(ori === 'hh'){
        if(ref === false)
            handOrientation += 'X'; // Palm left
        else
            handOrientation += 'Y'; // Palm right

        // Distal axis
        if(rot === 0 || rot === 1 || rot === 7){
            handOrientation += 'f';
        }
        else if (rot === 3 || rot === 4 || rot === 5){
            handOrientation += 'b';
        }
        else {
            // No es posible
        }
    }

    return handOrientation
}

const responseToSignotation = (response) => {
    let elements =[];
    response['explanations'].forEach((elem) => {
        if (elem['hand']) { // Hand elem is not null
            elements.push(handToSignotation(elem['hand']));
        }
    })
    return elements;
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
        .then(response => response.json())
        .then(response => {
            console.log(response)
            const signotation = responseToSignotation(response)
            console.log(signotation)
            // Redirect to Signario
            window.location.href = SIGNARIO_URL +
                                   '?buscador=pregunton&consulta=' + 
                                   encodeURIComponent(signotation[0]);
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