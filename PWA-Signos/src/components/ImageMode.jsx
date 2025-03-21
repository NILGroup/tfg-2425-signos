import { useState, useRef } from "react";
import Videos from "./Videos.jsx";
import UploadImage from "./UploadImage.jsx"
import uploadIcon from '../assets/upload-image.svg';
import QuestionIcon from '../assets/question.svg';

const ImageMode = ({isLoading, helpVisible, dispatch}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videos, setVideos] = useState(null);
  const [signotationText, setSignotationText] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  //const [helpVisible, setMoreInfoVisible] = useState(null);

  return (
    <>
      <div className={`flex flex-col items-center ${helpVisible ? "blur-sm" : ""}`}>
        <ExplText  selectedFile={selectedFile}/>

        <SignotationText signotationText={signotationText} isLoading={isLoading}/>
      
        <div className="bottom-12 flex flex-row gap-30 mt-20">
          <div className="flex flex-col gap-4">
            <Image selectedImage={selectedImage} selectedImageName={selectedImageName}/>

            <div className="flex justify-center gap-10">
              
              <SelectImageButton setSelectedFile={setSelectedFile} setSignotationText={setSignotationText} setVideos={setVideos} setSelectedImage={setSelectedImage} setSelectedImageName={setSelectedImageName}/>
              
              <UploadImage selectedFile={selectedFile} setSignotationText={setSignotationText} dispatch={dispatch} setVideos={setVideos}/>

              {/* <MoreInfoButton setMoreInfoVisible={setMoreInfoVisible}/> */}
            
            </div>
          </div>

          {isLoading && <Loading/>}

          <Videos videos={videos} isLoading={isLoading}/> 
          
        </div>
      </div>
    
      {/* {helpVisible && (
      <div className="absolute flex justify-center items-center">
        <BackButton setMoreInfoVisible={setMoreInfoVisible}/>
        <MoreInfoCard />
      </div>
      )} */}

    </>
  );
};

const ExplText = ({selectedFile}) => {
  return (
  <>
    {!selectedFile && 
    <div className="flex flex-col gap-10 mt-50"> <h1 className="text-[#4682A9] font-bold text-md md:text-xl lg:text-2xl md:expand-wide">Selecciona una imagen de SignoEscritura para ver la representación del signo y su traducción a signotación</h1>
    <h2 className="text-[#4682A9] text-md md:text-xl lg:text-2xl md:expand-wide">Cambiando de modo puedes dibujar el signo en Signoescritura para traducirlo.</h2> </div>}
  </>
  )
}

const SignotationText = ({signotationText, isLoading}) => {
  return (
    <>
    {signotationText && !isLoading && <div className="flex flex-col gap-4 mt-10"> 
              <h1 className="signotacion text-[#4682A9] font-bold text-3xl"> SIGNOTACIÓN </h1> 
              <h1 className="signotacion text-[#4682A9] font-bold text-2xl"> {signotationText}</h1> 
              </div> }
    </>
  )
}

const Image = ({selectedImage, selectedImageName}) => {
    return (<>{selectedImage && <div className="flex flex-col gap-1"> 
        <img className="border-4 rounded-xl border-[#4682A9] border-solid" src={selectedImage} alt="Signoescritura"/> 
        <p className="text-[#4682A9] font-bold text-lg"> {selectedImageName} </p> 
        </div>}</>)
}

const SelectImageButton = ({setSelectedFile, setSignotationText, setVideos, setSelectedImage, setSelectedImageName}) => {
    const input = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if(file){
          setSelectedFile(file);
          setSignotationText(null);
          setVideos(null);
          setSelectedImage(URL.createObjectURL(file));
          setSelectedImageName(file.name);
        }  
    };

    return (
        <>
        <input
              className="hidden"
              type="file"
              accept="image/*"
              max={1}
              ref={input}
              onChange={handleFileSelect}
            />
            
            {/*Choose image buttton*/}
            <button onClick={() => input.current.click()} className="group border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20 cursor-pointer">
              <img src={uploadIcon} alt="Upload Icon" className=" group-hover:brightness-0 group-hover:invert"/>
            </button>
        </>
    );
}

const MoreInfoCard = () => {
  return (
    <div className="h-100 w-100 bg-blue-50 rounded-lg">
      <h1>Traduciendo la signoescritura</h1>
    </div>
  )
}

const MoreInfoButton = ({setMoreInfoVisible}) => {

  const handleMoreInfoClick = () => {
    setMoreInfoVisible(true);
  }

  return (
    <>
    {/*More infgo buttton*/}
    <button onClick={handleMoreInfoClick} className="group border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20 cursor-pointer">
        <img src={QuestionIcon} alt="More info Icon" className=" group-hover:brightness-0 group-hover:invert"/>
     </button>
    </>  
  );
}

const BackButton = ({setMoreInfoVisible}) => {
  const handleBackButtonClick = () => {
    setMoreInfoVisible(false);
  }

  return (
    <>
    {/*More infgo buttton*/}
    <button onClick={handleBackButtonClick} className="group border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20 cursor-pointer">
        <img src={QuestionIcon} alt="More info Icon" className=" group-hover:brightness-0 group-hover:invert"/>
     </button>
    </> );
}

const Loading = () => {
  return (<>
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
  </>)
}

export default ImageMode;
