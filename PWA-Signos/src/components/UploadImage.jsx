import { useState, useRef } from "react";
import Video from "./Video.jsx";
import responseToSignotation from '../translator/LSETranslator.js'
import uploadIcon from '../assets/upload-image.svg';
import checkIcon from '../assets/check.svg'

const VISSE_BACKEND_URL = "https://holstein.fdi.ucm.es/visse/backend/recognize/raw";
const SIGNARIO_URL = "https://griffos.filol.ucm.es/signario/buscar?";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videos, setVideos] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [signotationText, setSignotationText] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [loading, setLoading] = useState(null);
  const input = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSignotationText(null);
    setVideos(null);
    setSelectedImage(URL.createObjectURL(file));
    setSelectedImageName(file.name);
  };

  const uploadImage = async (image) => {
    try {
      setLoading(true);
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
      await setSignotationText(signotation);
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
      setVideos(videosData["signs"]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleFileUpload = () => {
    setVideos(null);
    const image = new FormData();
    image.append("image", selectedFile);
    // Send selected image to Visse
    uploadImage(image);
  };

  return (

    <div className="flex flex-col items-center gap-20">

      

      {!selectedFile && <div className="flex flex-col gap-10 mt-50"> <h1 className="text-[#4682A9] font-bold text-md md:text-xl lg:text-2xl md:expand-wide">Selecciona una imagen de SignoEscritura para ver como se signa y su traducción a Signotación</h1>
                        <h2 className="text-[#4682A9] text-md md:text-xl lg:text-2xl md:expand-wide">Cambiando de modo puede dibujar el signo en Signoescritura que quiera traducir.</h2> </div>}

      {signotationText && !loading && <div className="flex flex-col gap-4 mt-10"> 
              <h1 className="signotacion text-[#4682A9] font-bold text-3xl"> SIGNOTACIÓN </h1> 
              <h1 className="signotacion text-[#4682A9] font-bold text-2xl"> {signotationText}</h1> 
              </div> }
    
      <div className="flex flex-row gap-30 mt-20">
        <div className="flex flex-col gap-4">
          {selectedImage && <div className="flex flex-col gap-1"> 
                            <img className="border-4 rounded-xl border-[#4682A9] border-solid" src={selectedImage} alt="Signoescritura"/> 
                            <p className="text-[#4682A9] font-bold text-lg"> {selectedImageName} </p> 
                            </div>}

          <div className="flex justify-center gap-10">
            <input
              className="hidden"
              type="file"
              accept="image/*"
              max={1}
              ref={input}
              onChange={handleFileSelect}
            />
            
            {/*Botón de Elegir imagen*/}
            <button onClick={() => input.current.click()} className="group border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20 cursor-pointer">
              <img src={uploadIcon} alt="Upload Icon" className=" group-hover:brightness-0 group-hover:invert"/>
            </button>
            
            {/*Botón de Tick*/}
            <button onClick={handleFileUpload} disabled={!selectedFile} className={`group border-[#4682A9] border-6 rounded-full w-20 h-20 ${selectedFile ? "hover:bg-[#4682A9] cursor-pointer" : "cursor-not-allowed"}`}>  
              <img src={checkIcon} alt="Send image" className={`${selectedFile ? "group-hover:brightness-0 group-hover:invert" : ""}`}/>
            </button>
          
          </div>
        </div>

        {loading && (
          <h1 className="flex text-3xl text-[#4682A9] m-40 font-bold gap-5">
            <svg className="w-8.5 h-8.5 animate-spin" viewBox="0 0 50 50">
              <circle
                className="stroke-current"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="80, 200"
                strokeDashoffset="0"
              ></circle>
            </svg>
            Cargando vídeos...
          </h1>
        )}

        {videos && !loading && (
          <div className="border-4 border-[#4682A9] rounded-xl w-250 h-127 overflow-hidden">
            <div className="flex flex-col overflow-y-scroll h-full 
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-neutral-700
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-neutral-500">
              {videos.map((_, index) => (
                <Video 
                  key={index}
                  index={index}
                  lastIndex={videos.length - 1}
                  info={videos[index]}
                  updateSelected={setSelectedVideo}
                  selectedVideo={selectedVideo}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UploadImage;
