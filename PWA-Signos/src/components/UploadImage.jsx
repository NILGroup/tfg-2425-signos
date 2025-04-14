import responseToSignotation from '../translator/LSETranslator.js'
import checkIcon from '../assets/check.svg';

const VISSE_BACKEND_URL = "https://holstein.fdi.ucm.es/visse/backend/recognize?raw=true";
const SIGNARIO_URL = "https://griffos.filol.ucm.es/signario/buscar?";

const UploadImage = ({image, dispatch}) => {

  const uploadImage = async (image) => {
    try {
      dispatch({ type: "set_loading" } )
      const response = await fetch(
        VISSE_BACKEND_URL/*"http://localhost:3999/recognize?raw=true"*/ ,
        {
          method: "POST",
          body: image,
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      const signotation = await responseToSignotation(responseData);
      dispatch({ type: "set_signotation", signotation: signotation });
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
      dispatch({ type: "signario_response", videos: videosData["signs"] });
    } catch (error) {
      dispatch({ type: "error_response", error: error });
      console.error("Error uploading image:", error);
    }
    finally {
      dispatch({ type: "set_loaded" } )
    }
  };

  const handleFileUpload = () => {
    const upload = new FormData();
    upload.append("image", image);
    // Send selected image to VisSE
    uploadImage(upload);
  };

  return (
    <>   
      {/*Check button*/}
      <button onClick={handleFileUpload} disabled={!image} className={`group border-[#4682A9] border-6 rounded-full w-20 h-20 ${image ? "hover:bg-[#4682A9] cursor-pointer" : "cursor-not-allowed"}`}>  
        <img src={checkIcon} alt="Send image" className={`${image ? "group-hover:brightness-0 group-hover:invert" : ""}`}/>
      </button>
    </>
  );
};

export default UploadImage;
