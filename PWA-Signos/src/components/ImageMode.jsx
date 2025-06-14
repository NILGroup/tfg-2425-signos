import { useRef } from "react";
import Signotation from "./Signotation.jsx";  
import Videos from "./Videos.jsx";
import uploadIcon from '../assets/upload-image.svg';
import QuestionIcon from '../assets/question.svg';
import Description from "./Description.jsx";
import checkIcon from '../assets/check.svg';
import { connection } from "../connection.js";

const ImageMode = ({isLoading, file, image, imageName, signotation, selectedSignotation, videos, error, dispatch}) => {
  return (

	<div className="flex flex-1 flex-col md:min-h-full md:grid md:grid-cols-2 md:grid-rows-3 md:grid-rows-[auto_1fr_auto] md:grid-cols-[1fr_1fr]">
		{!image && <div className={`flex flex-col flex-1 justify-center items-center gap-4 mx-3 md:mx-3 mt-2 md:mt-0 mb-4 md:mb-0 md:content-center md:row-start-1 md:row-end-3 md:col-start-1 ${!videos && !isLoading ? "md:col-end-3" : "md:col-end-2"}`}>
			<ExplText/>
			<ExamplesButton dispatch={dispatch}/>
		</div>}
	
		<Image image={image} imageName={imageName} videos={videos} isLoading={isLoading} error={error} signotation={signotation} selectedSignotation={selectedSignotation} dispatch={dispatch}/>

		{isLoading && <Loading/>}

		{error && <Error error={error}/>}
		
		<Signotation selectedSignotation={selectedSignotation} signotation={signotation} isLoading={isLoading} dispatch={dispatch}/>
		
		<Videos videos={videos} isLoading={isLoading}/> 

		<div className={`flex justify-center items-center gap-10 my-4 md:my-0 md:mb-3 lg:mb-8 md:col-start-1 ${!videos && !isLoading && !error ? "md:row-start-3 md:row-end-4 md:col-end-3": "md:col-end-2 md:row-start-3 md:row-end-3"}`}>
				
			<SelectImageButton dispatch={dispatch}/>
			
			<UploadImageButton dispatch={dispatch} image={file} showButton={signotation==null && !isLoading}/>

			<MoreInfoButton dispatch={dispatch}/>
			
		</div>
	</div>
    
  );
};

const ExplText = () => {
  return (
  <>
    <div className="flex flex-col gap-4 md:gap-10 cursor-default"> 
      <h1 className="text-[#4682A9] font-bold text-lg md:text-xl lg:text-2xl md:expand-wide">
      Selecciona una imagen de SignoEscritura para ver la representación del signo y su traducción a signotación
      </h1>
      <h2 className="text-[#4682A9] text-lg md:text-xl lg:text-2xl md:expand-wide pb-5">Cambiando de modo puedes dibujar el signo en Signoescritura para traducirlo.</h2> 
    </div>
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
    <button onClick={handleClick} className="group border-[#4682A9] lg:mb-4 border-3 lg:border-4 hover:bg-[#4682A9] rounded-full w-58 h-12 lg:w-70 lg:h-15 cursor-pointer"
                                              aria-label="Ver ejemplos de SignoEscritura" title="Ejemplos de SignoEscritura">
      <p className="group-hover:brightness-0 group-hover:invert signotacion text-[#4682A9] font-bold text-lg lg:text-xl">Prueba con un ejemplo</p>
    </button>}
    </>
  );
}

export const Image = ({image, imageName, videos, isLoading, error, signotation, selectedSignotation}) => {
    return (<>{image && <div className={`flex flex-col-reverse md:flex-col flex-1 items-center justify-center md:gap-5 md:row-start-2 md:row-end-3 md:col-start-1 ${!videos && !isLoading && !error ? "md:col-end-3" : "md:col-end-2"}`}> 
        {selectedSignotation && <Description signotation={signotation} selectedSignotation={selectedSignotation}/>}
        <img className="mx-2 md:mx-0 md:max-w-[325px] lg:max-w-[400px] xl:max-w-[600px] 2xl:max-w-[800px] scale-80 md:scale-100 border-3 md:border-4 rounded-xl border-[#4682A9] border-solid" src={image} alt="SignoEscritura"/> 
        <p className="hidden md:block text-[#4682A9] font-bold text-lg cursor-default"> {imageName} </p> 
        </div>}</>)
}

export const SelectImageButton = ({dispatch}) => {
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
            <button onClick={() => input.current.click()} className="group button cursor-pointer" aria-label="Seleccionar SignoEscritura del dispositivo" title="Seleccionar imagen">
              <img src={uploadIcon} alt="Seleccionar SignoEscritura del dispositivo " className=" group-hover:brightness-0 group-hover:invert"/>
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
      {showButton && <button onClick={handleFileUpload} disabled={!image} className={` border-[#4682A9] border-4 lg:border-6 rounded-full w-18 md:w-16 lg:w-20 h-18 md:h-16 lg:h-20
                                                                                     ${!image ? "" : "group hover:bg-[#4682A9]"} ${image ? "cursor-pointer" : "cursor-not-allowed"}`}
                                                                                     aria-label="Enviar SignoEscritura" title="Enviar imagen">  
        <img src={checkIcon} alt="Enviar SignoEscritura" className={`${!image ? "" : "group-hover:brightness-0 group-hover:invert"}`}/>
      </button>}
    </>
  );
};


export const MoreInfoButton = ({dispatch}) => {

  const handleMoreInfoClick = () => {
    dispatch({ type: "show_help" });
  }

  return (
    <>
    {/*More info buttton*/}
    <button onClick={handleMoreInfoClick} className="group button cursor-pointer" aria-label="Más información" title="Más información">
        <img src={QuestionIcon} alt="Más información" className=" group-hover:brightness-0 group-hover:invert"/>
     </button>
    </>  
  );
}

export const Loading = () => {
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

export const Error = ({error}) => {
	return (
	<div className="flex flex-1 flex-col justify-center items-center gap-1 md:gap-3 mx-4 md:mx-0 text-xl md:text-2xl text-[#4682A9] font-bold md:row-start-1 md:row-end-3 md:col-start-2 md:col-end-3">
    <h1>¡Lo sentimos!</h1>
	  <h1>{error}</h1>
    <h1>Por favor, vuelva a intentarlo.</h1>     
	</div>  
  )
}

export default ImageMode;
