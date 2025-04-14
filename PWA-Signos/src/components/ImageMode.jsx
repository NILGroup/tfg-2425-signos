import { useRef } from "react";
import Signotation from "./Signotation.jsx";  
import Videos from "./Videos.jsx";
import uploadIcon from '../assets/upload-image.svg';
import QuestionIcon from '../assets/question.svg';
import Description from "./Description.jsx";
import checkIcon from '../assets/check.svg';
import { connection } from "../connection.js";

const ImageMode = ({isLoading, helpVisible, file, image, imageName, signotation, selectedSignotation, videos, dispatch}) => {
  //const [selectedFile, setSelectedFile] = useState(null);
  //const [videos, setVideos] = useState(null);
  //const [signotationText, setSignotationText] = useState(null);
  //const [helpVisible, setMoreInfoVisible] = useState(null);

  return (
    <>
      <div className={`flex flex-col items-center ${helpVisible ? "blur-sm" : ""}`}>
        <ExplText  fileSelected={image}/>

        <ExamplesButton dispatch={dispatch} fileSelected={image} />

        <Signotation dispatch={dispatch} signotation={signotation} isLoading={isLoading}/>

        <div className="bottom-12 flex flex-row gap-30 mt-20">
          <div className="flex flex-col gap-4 max-w-[700px]">
            <Description signotation={signotation} selectedSignotation={selectedSignotation}/>
            <Image image={image} imageName={imageName}/>

            <div className="flex justify-center gap-10">
              
              <SelectImageButton dispatch={dispatch}/>
              
              <UploadImageButton dispatch={dispatch} image={file} showButton={signotation==null && !isLoading}/>

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

const ExplText = ({fileSelected}) => {
  return (
  <>
    {!fileSelected && 
    <div className="flex flex-col gap-10 mt-50"> <h1 className="text-[#4682A9] font-bold text-md md:text-xl lg:text-2xl md:expand-wide">Selecciona una imagen de SignoEscritura para ver la representación del signo y su traducción a signotación</h1>
    <h2 className="text-[#4682A9] text-md md:text-xl lg:text-2xl md:expand-wide pb-5">Cambiando de modo puedes dibujar el signo en Signoescritura para traducirlo.</h2> </div>}
  </>
  )
}

const ExamplesButton = ({dispatch, fileSelected}) => {

  const handleClick = () => {
    dispatch({type: "show_examples"})
  }

  return (
    <>
    {!fileSelected && 
    <button onClick={handleClick} className="group border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-70 h-15 cursor-pointer">
      <h3 className="group-hover:brightness-0 group-hover:invert signotacion text-[#4682A9] font-bold text-xl">Prueba con un ejemplo</h3>
    </button>}
    </>
  );
}

export const Image = ({image, imageName}) => {
    return (<>{image && <div className="flex flex-col gap-1"> 
        <img className="border-4 rounded-xl border-[#4682A9] border-solid" src={image} alt="Signoescritura"/> 
        <p className="text-[#4682A9] font-bold text-lg"> {imageName} </p> 
        </div>}</>)
}

const SelectImageButton = ({dispatch}) => {
    const input = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if(file){
          dispatch({type: 'select_image', image: file});
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

const UploadImageButton = ({dispatch, image, showButton}) => {

  const handleFileUpload = () => {
    dispatch({type: 'upload_image'});  
    const upload = new FormData();
    upload.append("image", image);
    // Send selected image to VisSE
    connection(dispatch, upload);
  };

  return (
    <>   
      {/*Check button*/}
      {showButton && <button onClick={handleFileUpload} disabled={!image} className={`group border-[#4682A9] border-6 rounded-full w-20 h-20 ${image ? "hover:bg-[#4682A9] cursor-pointer" : "cursor-not-allowed"}`}>  
        <img src={checkIcon} alt="Send image" className={`${image ? "group-hover:brightness-0 group-hover:invert" : ""}`}/>
      </button>}
    </>
  );
};

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
    {/*More info buttton*/}
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
    {/*More info buttton*/}
    <button onClick={handleBackButtonClick} className="group border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20 cursor-pointer">
        <img src={QuestionIcon} alt="More info Icon" className=" group-hover:brightness-0 group-hover:invert"/>
     </button>
    </> );
}

export const Loading = () => {
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
