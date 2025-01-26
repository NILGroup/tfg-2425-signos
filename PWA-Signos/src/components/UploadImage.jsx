import React, { useState } from "react";
import Video from './Video.jsx'

const VISSE_BACKEND_URL = 'https://garciasevilla.com/visse/backend/'
const SIGNARIO_URL = 'https://griffos.filol.ucm.es/signario/buscar?'

const handToSignotation = (hand) => {
    let handSignotation = hand['SHAPE']
    handSignotation += ':' + handOrientation(hand['VAR'], hand['ROT'], hand['REF'])
    return handSignotation
}

const handOrientation = (ori, rot, ref) => {
    let handOrientation = ''

    // Palm orientation
    if(ori === 'b'){
        handOrientation += 'F'; // Palm forward

        // Distal axis
        if(rot === 'N' || rot === 'NE' || rot === 'NW'){
            handOrientation += 'h';
        }
        else if(rot === 'E'){
            handOrientation += 'y';
        }
        else if (rot === 'S' || rot === 'SE' || rot === 'SW'){
            handOrientation += 'l';
        }
        else if(rot === 'W'){
            handOrientation += 'x';
        }
    }
    else if(ori === 'w'){
        handOrientation += 'B'; // Palm backwards

        // Distal axis
        if(rot === 'N' || rot === 'NE' || rot === 'NW'){
            handOrientation += 'h';
        }
        else if(rot === 'E'){
            handOrientation += 'y';
        }
        else if (rot === 'S' || rot === 'SE' || rot === 'SW'){
            handOrientation += 'l';
        }
        else if(rot === 'W'){
            handOrientation += 'x';
        }
    }
    else if(ori === 'h'){
        if(ref === 'n')
            handOrientation += 'X'; // Palm left
        else
            handOrientation += 'Y'; // Palm right

        // Distal axis
        if(rot === 'N' || rot === 'NE' || rot === 'NW'){
            handOrientation += 'h';
        }
        else if (rot === 'S' || rot === 'SE' || rot === 'SW'){
            handOrientation += 'l';
        }
        else {
            // No es posible
        }
    }
    else if(ori === 'hb'){
        handOrientation += 'L'; // Palm down

        // Distal axis
        if(rot === 'N' || rot === 'NE' || rot === 'NW'){
            handOrientation += 'f';
        }
        else if(rot === 'E'){
            handOrientation += 'y';
        }
        else if (rot === 'S' || rot === 'SE' || rot === 'SW'){
            handOrientation += 'b';
        }
        else if(rot === 'W'){
            handOrientation += 'x';
        }
    }
    else if(ori === 'hw'){
        handOrientation += 'H'; // Palm up

        // Distal axis
        if(rot === 'N' || rot === 'NE' || rot === 'NW'){
            handOrientation += 'f';
        }
        else if(rot === 'E'){
            handOrientation += 'y';
        }
        else if (rot === 'S' || rot === 'SE' || rot === 'SW'){
            handOrientation += 'b';
        }
        else if(rot === 'W'){
            handOrientation += 'x';
        }
    }
    else if(ori === 'hh'){
        if(ref === 'n')
            handOrientation += 'X'; // Palm left
        else
            handOrientation += 'Y'; // Palm right

        // Distal axis
        if(rot === 'N' || rot === 'NE' || rot === 'NW'){
            handOrientation += 'f';
        }
        else if (rot === 'S' || rot === 'SE' || rot === 'SW'){
            handOrientation += 'b';
        }
        else {
            // No es posible
        }
    }
    return handOrientation
}

const headToSignotation = (head) => {
    const head_shape = {
        'face': 'Car',
        'fore': 'Cab',
        'chin': 'Bar',
        'cheeks': 'Mej',
        'mouth': 'Boc',
        'moutho': 'Boc',
        'smile': 'Boc',
        'teeth': 'Boc',
        'tongue': 'Boc',
        'nose': 'Nar',
        'ears': 'Ore',
        'eyes': 'Ojo',
        'hair': 'Cab',
        'back': 'CabB',
        'neck': 'Cue'
    }
    return head_shape[head['SHAPE']];
}

const diacToSignotation = (diac) => {
    const diac_shape = {
        'touch': '*',
        'inter': '*',
        'brush': '*', //( : * : * )
        'grasp': '*',
        'between': '*',
        'rub': '*', //significa contacto en las tres partes ( * : * : * )
        'flex_hook': '^', //mov interno de la mano - garra dedos
        'flex_base': '7',
        'flex_alt': '7w',
        'ext_hook': '<', //mov interno de la mano - extender dedo (ej tatata)
        'ext_base': '<',
        'ext_alt': '<w',
        'strike': '*',  //( : * : )
        'tense': '!',
        'wiggle': 'w',
        'sym': '=',
        'altern': '~',
    }
    return diac_shape[diac['SHAPE']];
}

const arroToSignotation = (arro) => {}
const stemToSignotation = (stem) => {}
const arcToSignotation = (arc) => {}

const responseToSignotation = (response) => {
    let signotation = '';
    let head = '';
    let diac = [];
    let hand = [];
    let arro = [];
    let stem = [];
    let arc = [];
    response['graphemes'].forEach((grapheme) => {
        switch(grapheme['tags']['CLASS']){
            case 'HEAD':
                head += headToSignotation(grapheme['tags']);
                break
            case 'DIAC':
                diac += diacToSignotation(grapheme['tags']);
                break
            case 'HAND':
                hand += handToSignotation(grapheme['tags']);
                break
            case 'ARRO':
                arro += arroToSignotation(grapheme['tags']);
                break
            case 'STEM':
                stem += stemToSignotation(grapheme['tags']);
                break
            case 'ARC':
                arc = arcToSignotation(grapheme['tags']);
                break
            default:
                break
        }
    })
    return hand;
}

const UploadImage = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [videos, setVideos] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleFileUpload = () => {
        setVideos(null)
        const image = new FormData();
        image.append('image', selectedFile);
        // Send selected image to Visse
        fetch(/*VISSE_BACKEND_URL + 'recognize'*/ 'http://localhost:3999/recognize/raw', {
            method: 'POST',
            body: image,
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            const signotation = responseToSignotation(response)
            console.log(signotation)

            const url = new URL(SIGNARIO_URL + new URLSearchParams({
                s: signotation,
                // l es opcional
            }))

            fetch(url, {
                method: 'GET'
            })
            .then(videosResponse => videosResponse.json())
            .then(videosResponse => {
                console.log(videosResponse)
                setVideos(videosResponse['signs']);
            })

        })
        // VER COMO MANEJAR ERRORES
        .catch(error => console.error('Error uploading file:', error)); 
    }

    return (
        <div className="buttons">
            <input className='select-image-button' type='file' accept='image/*' max={1} onChange={handleFileSelect}/>
            <button className='upload-image-button' onClick={handleFileUpload}>
                Enviar imagen
            </button>
            
            {videos !== null && (videos.map((_, index) => {
                return(
                    <Video 
                        key={index}
                        info={videos[index]}
                    >                        
                    </Video>
                )
            }))}

            
        </div> 
    );
}

export default UploadImage;