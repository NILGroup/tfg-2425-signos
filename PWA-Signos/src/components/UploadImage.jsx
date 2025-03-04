import { useState } from "react";
import Video from "./Video.jsx";
import responseToSignotation from '../translator/LSETranslator.js'

const VISSE_BACKEND_URL = "https://holstein.fdi.ucm.es/visse/backend/recognize/raw";
const SIGNARIO_URL = "https://griffos.filol.ucm.es/signario/buscar?";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videos, setVideos] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [text, setText] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleFileUpload = () => {
    setVideos(null);
    const image = new FormData();
    image.append("image", selectedFile);
    // Send selected image to Visse
    const uploadImage = async () => {
      try {
        const response = await fetch(
          VISSE_BACKEND_URL /*"http://localhost:3999/recognize/raw"*/,
          {
            method: "POST",
            body: image,
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        const signotation = await responseToSignotation(responseData);
        await setText(signotation);
        const url = new URL(
          SIGNARIO_URL +
            new URLSearchParams({
              s: signotation,
              // l es opcional
            })
        );

        const videosResponse = await fetch(url, {
          method: "GET",
        });
        const videosData = await videosResponse.json();
        console.log(videosData);
        await setVideos(videosData["signs"]);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
    uploadImage();
  };

  return (
    <div className="buttons">
      <input
        className="select-image-button"
        type="file"
        accept="image/*"
        max={1}
        onChange={handleFileSelect}
      />
      <button className="upload-image-button" onClick={handleFileUpload}>
        Enviar imagen
      </button>

      {selectedImage && <img src={selectedImage} alt="Sinoescritura"/>}
      {text && <h1>Signotación: {text}</h1>}

      <div className="videos">
        
        {videos !== null &&
          videos.map((_, index) => {
            return (
              <Video
                key={index}
                index={index}
                info={videos[index]}
                updateSelected={setSelectedVideo}
                selectedVideo={selectedVideo}
              ></Video>
            );
          })}
      </div>
    </div>
  );
};

export default UploadImage;
