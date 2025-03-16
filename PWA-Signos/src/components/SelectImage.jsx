import { useState, useRef } from "react";
import uploadIcon from '../assets/upload-image.svg';
import UploadImage from "./UploadImage.jsx";

const SelectImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const input = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
    setSelectedImageName(file.name);
  };

  return (

    <div className="flex flex-col items-center gap-20">

      {!selectedFile && <div className="flex flex-col gap-10 mt-50"> <h1 className="text-[#4682A9] font-bold text-md md:text-xl lg:text-2xl md:expand-wide">Selecciona una imagen de SignoEscritura para ver como se signa y su traducción a Signotación</h1>
                        <h2 className="text-[#4682A9] text-md md:text-xl lg:text-2xl md:expand-wide">Cambiando de modo puede dibujar el signo en Signoescritura que quiera traducir.</h2> </div>}

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
            
            {/*Select image button*/}
            <button onClick={() => input.current.click()} className="group border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20 cursor-pointer">
              <img src={uploadIcon} alt="Upload Icon" className=" group-hover:brightness-0 group-hover:invert"/>
            </button>

            {/*Check button*/}
            <UploadImage file={selectedFile}/>      
          </div>
        </div>
      </div>
    </div>

  );
};

export default SelectImage;
