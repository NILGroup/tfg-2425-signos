import { useState, useRef } from "react";
import Video from "./Video.jsx";
import responseToSignotation from '../translator/LSETranslator.js'
import uploadIcon from '../assets/upload-image.svg';
import checkIcon from '../assets/check.svg';

const VISSE_BACKEND_URL = "https://holstein.fdi.ucm.es/visse/backend/recognize/raw";
const SIGNARIO_URL = "https://griffos.filol.ucm.es/signario/buscar?";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videos, setVideos] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [text, setText] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const input = useRef(null);

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

      {text && <div clasName="flex flex-col"> 
              <h1 className="signotacion text-[#4682A9] font-bold text-3xl mb-4"> SIGNOTACIÓN </h1> 
              <h1 className="signotacion text-[#4682A9] font-bold text-2xl"> {text}</h1> 
              </div>}

      {selectedImage && <img src={selectedImage} alt="Signoescritura"/>}

      <div className="flex gap-10">
        <input
          className="hidden"
          type="file"
          accept="image/*"
          max={1}
          ref={input}
          onChange={handleFileSelect}
        />

        <button onClick={() => input.current.click()} className="group border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20">
          <img src={uploadIcon} alt="Upload Icon" className="scale-150 p-2 pt-2.25 group-hover:brightness-0 group-hover:invert"/>
        </button>

        <button onClick={handleFileUpload} className="group border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20">
          <img src={checkIcon} alt="Send image" className="scale-180 p-2.75 pt-3.25 group-hover:brightness-0 group-hover:invert"/>
        </button>
      
      </div>

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
