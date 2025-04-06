import { useRef } from "react";
import Videos from "./Videos.jsx";
import UploadImage from "./UploadImage.jsx"
import uploadIcon from '../assets/upload-image.svg';
import QuestionIcon from '../assets/question.svg';

const ImageMode = ({isLoading, helpVisible, file, image, imageName, signotation, videos, error, dispatch}) => {
  //const [selectedFile, setSelectedFile] = useState(null);
  //const [videos, setVideos] = useState(null);
  //const [signotationText, setSignotationText] = useState(null);
  //const [helpVisible, setMoreInfoVisible] = useState(null);

  return (
    <>
      <div className="flex flex-1 flex-col md:min-h-full md:grid md:grid-cols-2 md:grid-rows-3 md:grid-rows-[80px_1fr_100px] md:grid-cols-[1fr_1fr]">
        {!image && <div className={`flex flex-col flex-1 justify-center items-center mt-2 md:mt-0 mb-4 md:mb-0 md:content-center md:row-start-1 md:row-end-3 md:col-start-1 ${!videos && !isLoading ? "md:col-end-3" : "md:col-end-2"}`}>
          <ExplText/>
          <ExamplesButton/>
        </div>}
      
        <Image image={image} imageName={imageName} videos={videos} isLoading={isLoading} error={error}/>

		{isLoading && <Loading/>}

    {error && <Error error={error}/>}
		
		<SignotationText signotation={signotation} isLoading={isLoading}/>
	
		<Videos videos={videos} isLoading={isLoading}/> 

		

    <div className={`flex justify-center items-end gap-10 my-4 md:my-0 md:mb-4 md:col-start-1 ${!videos && !isLoading && !error ? "md:mb-8 md:row-start-3 md:row-end-4 md:col-end-3": "md:col-end-2 md:row-start-2 md:row-end-3"}`}>
          
			<SelectImageButton dispatch={dispatch}/>
			
			<UploadImage dispatch={dispatch} image={file}/>

			<MoreInfoButton dispatch={dispatch}/>
			
        </div>
  
      </div>


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
    <button className="group border-[#4682A9] border-3 md:border-4 hover:bg-[#4682A9] rounded-full w-70 h-15 cursor-pointer">
      <h3 className="group-hover:brightness-0 group-hover:invert signotacion text-[#4682A9] font-bold text-xl">Prueba con un ejemplo</h3>
    </button>
    </>
  );
}

const SignotationText = ({signotation, isLoading}) => {
  return (
    <>
    {signotation && !isLoading && <div className="flex flex-col justify-center items-center md:gap-3 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-4"> 
              <h1 className="signotacion text-[#4682A9] font-bold text-xl md:text-3xl"> SIGNOTACIÓN </h1> 
              <h1 className="signotacion text-[#4682A9] font-bold text-lg md:text-2xl"> {signotation}</h1> 
              </div> }
    </>
  )
}

const Image = ({image, imageName, videos, isLoading, error}) => {
    return (<>{image && <div className={`flex flex-col flex-1 items-center justify-center md:row-start-2 md:row-end-3 md:col-start-1 ${!videos && !isLoading && !error ? "md:col-end-3" : "md:col-end-2"}`}> 
        <img className="mx-2 md:mx-0 scale-80 md:scale-100 border-4 rounded-xl border-[#4682A9] border-solid" src={image} alt="Signoescritura"/> 
        <p className="hidden md:block text-[#4682A9] font-bold text-lg"> {imageName} </p> 
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


const MoreInfoButton = ({dispatch}) => {

  const handleMoreInfoClick = () => {
    dispatch({ type: "show_help" });
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



const Loading = () => {
  return (<>
    <h1 className="flex flex-1 justify-center items-center text-xl md:text-2xl text-[#4682A9] font-bold gap-5 md:row-start-1 md:row-end-3 md:col-start-2 md:col-end-3">
      <svg className="w-6.5 h-6.5 md:w-8.5 md:h-8.5 animate-spin" viewBox="0 0 50 50">
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

const Error = ({error}) => {
	return (
	<div className="flex flex-1 flex-col justify-center items-center gap-1 md:gap-3 mx-4 md:mx-0 text-xl md:text-2xl text-[#4682A9] font-bold md:row-start-1 md:row-end-3 md:col-start-2 md:col-end-3">
    <h1>¡Lo sentimos!</h1>
	  <h1>{error}</h1>
    <h1>Por favor, vuelva a intentarlo.</h1>     
	</div>  
  )
}

export default ImageMode;
