import { useState, useRef } from "react";
import Videos from "./Videos.jsx";
import UploadImage from "./UploadImage.jsx"
import uploadIcon from '../assets/upload-image.svg';
import QuestionIcon from '../assets/question.svg';

const ImageMode = ({isLoading, helpVisible, file, image, imageName, signotation, videos, dispatch}) => {
  //const [selectedFile, setSelectedFile] = useState(null);
  //const [videos, setVideos] = useState(null);
  //const [signotationText, setSignotationText] = useState(null);
  //const [helpVisible, setMoreInfoVisible] = useState(null);

  return (
    <>
      <div className={`flex flex-1 flex-col md:min-h-full md:grid md:grid-cols-2 md:grid-rows-2 md:grid-rows-[1fr_100px] md:grid-cols-[1fr_1fr] ${helpVisible ? "blur-sm" : ""}`}>
        {!image && <div className={`flex flex-col flex-1 justify-center items-center mt-2 md:mt-0 mb-4 md:mb-0 md:content-center md:col-start-1 ${!videos && !isLoading ? "md:col-end-3" : "md:col-end-2"}`}>
          <ExplText/>
          <ExamplesButton/>
        </div>}

        <SignotationText signotation={signotation} isLoading={isLoading}/>
      
        <Image image={image} imageName={imageName} videos={videos} isLoading={isLoading}/>

        <div className={`flex justify-center items-center mb-2.5 gap-10 md:row-start-2 md:row-end-3 md:col-start-1 ${!videos && !isLoading ? "md:col-end-3": "md:col-end-2"}`}>
          
			<SelectImageButton dispatch={dispatch}/>
			
			<UploadImage dispatch={dispatch} image={file}/>

			{/* <MoreInfoButton setMoreInfoVisible={setMoreInfoVisible}/> */}
			
        </div>

          {isLoading && <Loading/>}

          <Videos videos={videos} isLoading={isLoading}/> 
  
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

const ExplText = () => {
  return (
  <>

    <div className="flex flex-col gap-10 mx-2 md:mx-0"> <h1 className="text-[#4682A9] font-bold text-md md:text-xl lg:text-2xl md:expand-wide">Selecciona una imagen de SignoEscritura para ver la representación del signo y su traducción a signotación</h1>
    <h2 className="text-[#4682A9] text-md md:text-xl lg:text-2xl md:expand-wide pb-5">Cambiando de modo puedes dibujar el signo en Signoescritura para traducirlo.</h2> </div>
  </>
  )
}

const ExamplesButton = () => {
  return (
    <>
    <button className="group border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-70 h-15 cursor-pointer">
      <h3 className="group-hover:brightness-0 group-hover:invert signotacion text-[#4682A9] font-bold text-xl">Prueba con un ejemplo</h3>
    </button>
    </>
  );
}

const SignotationText = ({signotation, isLoading}) => {
  return (
    <>
    {signotation && !isLoading && <div className="flex flex-col gap-4 mt-10"> 
              <h1 className="signotacion text-[#4682A9] font-bold text-3xl"> SIGNOTACIÓN </h1> 
              <h1 className="signotacion text-[#4682A9] font-bold text-2xl"> {signotation}</h1> 
              </div> }
    </>
  )
}

const Image = ({image, imageName, videos, isLoading}) => {
    return (<>{image && <div className={`flex flex-col flex-1 items-center justify-center gap-1 md:row-start-1 md:row-end-2 md:col-start-1 ${!videos && !isLoading ? "md:col-end-3" : "md:col-end-2"}`}> 
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
