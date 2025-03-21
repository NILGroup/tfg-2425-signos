import responseToSignotation from '../translator/LSETranslator.js'
import checkIcon from '../assets/check.svg';

const VISSE_BACKEND_URL = "https://holstein.fdi.ucm.es/visse/backend/recognize/raw";
const SIGNARIO_URL = "https://griffos.filol.ucm.es/signario/buscar?";

const UploadImage = ({dispatch}) => {

  const uploadImage = async (image) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleFileUpload = () => {
    setVideos(null);
    const image = new FormData();
    image.append("image", selectedFile);
    // Send selected image to VisSE
    uploadImage(image);
  };

  return (
    <>   
      {/*Check button*/}
      <button onClick={handleFileUpload} disabled={!selectedFile} className={`group border-[#4682A9] border-6 rounded-full w-20 h-20 ${selectedFile ? "hover:bg-[#4682A9] cursor-pointer" : "cursor-not-allowed"}`}>  
        <img src={checkIcon} alt="Send image" className={`${selectedFile ? "group-hover:brightness-0 group-hover:invert" : ""}`}/>
      </button>
    </>
  );
};

export default UploadImage;
