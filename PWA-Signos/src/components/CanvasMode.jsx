import { useEffect, useRef } from "react";
import clearIcon from "../assets/delete.svg";
import checkIcon from "../assets/check.svg";
import Description from "./Description.jsx";
import Signotation from "./Signotation.jsx";  
import Videos from "./Videos.jsx";
import { connection } from "../connection.js";
import { Image, Error, Loading } from "./ImageMode.jsx";

const CanvasMode = ({isLoading, image, imageName, signotation, selectedSignotation, videos, error, dispatch }) => {
    return (
        <div className="flex flex-1 flex-col">
            {!image && <Canvas dispatch={dispatch}/>}
            
            <Image image={image} imageName={imageName} videos={videos} isLoading={isLoading} error={error} signotation={signotation} selectedSignotation={selectedSignotation} dispatch={dispatch}/>

            {isLoading && <Loading/>}

            <Signotation dispatch={dispatch} signotation={signotation} isLoading={isLoading}/>

            {error && <Error error={error}/>}

            <Videos videos={videos} isLoading={isLoading}/> 
        
            
        </div>
    );
};

const Canvas = ({dispatch}) => {
    const canvasRef = useRef(null);
    const toolbarRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const toolbar = toolbarRef.current;
        if (!canvas || !toolbar) return;

        const ctx = canvas.getContext("2d");
       

        let canvasOffsetX = canvas.offsetLeft;
        let canvasOffsetY = canvas.offsetTop;

        let rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        window.onresize = () => {
            canvasOffsetX = canvas.offsetLeft;
            canvasOffsetY = canvas.offsetTop;
            rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        let drawing = false;

        canvas.onmousedown = (e) => {
            drawing = true;
            canvas.onmousemove = (event) => {
                if (!drawing) return;
                const x = event.clientX - canvasOffsetX;
                const y = event.clientY - canvasOffsetY;
                draw(x, y);
            };
        };

        canvas.onmouseup = () => {
            drawing = false;
            ctx.stroke();
            ctx.beginPath();
        };

        canvas.ontouchstart = (e) => {
            drawing = true;
            e.preventDefault();
        };

        canvas.ontouchmove = (e) => {
            if (!drawing) return;
            e.preventDefault();
            const touch = e.touches[0];
            const x = touch.clientX - canvas.offsetLeft;
            const y = touch.clientY - canvas.offsetTop;
            draw(x, y);
        };

        canvas.ontouchend = () => {
            drawing = false;
            ctx.stroke();
            ctx.beginPath();
        };

        
        const draw = (x, y) => {
            if (!drawing) return;
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.strokeStyle = "black";
            ctx.lineTo(x, y);
            ctx.stroke();
        };

        toolbar.onclick = async (e) => {
            if (e.target.id === "clear") {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } else if (e.target.id === "upload") {
                // Create temporary canvas
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                const tempCtx = tempCanvas.getContext('2d');
                
                // 1. Fill temp canvas with white
                tempCtx.fillStyle = 'white';
                tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
                
                // 2. Draw original content on top
                tempCtx.drawImage(canvas, 0, 0);
                            
                tempCanvas.toBlob((blob) => {
                     
                    const image = new File([blob], "SignoEscritura", { type: blob.type })

                    dispatch({
                        type: "upload_canvas",
                        file: image,
                    });
                    const upload = new FormData();
                    upload.append("image", image);
                    // Send selected image to VisSE
                    connection(dispatch, upload);                 
                }, "image/png");
            
            }
        };

        return () => {
            // Clean events
            canvas.onmousedown = null;
            canvas.onmouseup = null;
            canvas.onmousemove = null;
        };
    }, []);

   
    return (
        <div className="flex flex-col flex-1 h-screen justify-center items-center gap-5 md:gap-10 mx-5 mb-5 md:mx-0 md:mb-0">
            <canvas
                ref={canvasRef}
                className="border-4 border-[#4682A9] rounded-xl bg-[#FFFFFF] w-full h-[65vh]"
                id="canvas"
            />
            <div ref={toolbarRef} id="toolbar" className="flex flex-row gap-10">

                <ClearButton/>
                <UploadCanvasButton/> 
                
            </div>
        </div>
    );

}

const ClearButton = () => {
    return (
        <button
        id="clear"
        className="border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20 cursor-pointer">
            <img
                src={clearIcon}
                id="clear"
                alt="Clear Icon"
                className="hover:brightness-0 hover:invert"
            />
        </button>
    );
}


const UploadCanvasButton = () => {
    return (
        <button
        id="upload"
        className="border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20 cursor-pointer">
            <img
                src={checkIcon}
                id="upload"
                alt="Upload Icon"
                className="hover:brightness-0 hover:invert"
            />
        </button>
    );
}

export default CanvasMode;
