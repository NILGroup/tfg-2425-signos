import { useEffect, useRef } from "react";
import clearIcon from "../assets/delete.svg";
import checkIcon from "../assets/check.svg";
import Signotation from "./Signotation.jsx";  
import Videos from "./Videos.jsx";
import { MoreInfoButton } from "./ImageMode.jsx";
import { connection } from "../connection.js";
import { Image, Error, Loading } from "./ImageMode.jsx";

const CanvasMode = ({isLoading, image, imageName, signotation, selectedSignotation, videos, error, dispatch }) => {
    return (
        <div className="flex flex-1 flex-col md:min-h-full md:grid md:grid-cols-2 md:grid-rows-3 md:grid-rows-[80px_1fr_80px] md:grid-cols-[1fr_1fr]">
            {!image && <Canvas dispatch={dispatch}/>}
            
            <Image image={image} imageName={imageName} videos={videos} isLoading={isLoading} error={error} signotation={signotation} selectedSignotation={selectedSignotation} dispatch={dispatch}/>

            {isLoading && <Loading/>}

            <Signotation dispatch={dispatch} signotation={signotation} isLoading={isLoading}/>

            {error && <Error error={error}/>}

            <Videos videos={videos} isLoading={isLoading}/>

            {image && <div className={`flex justify-center items-end gap-10 my-4 md:my-0 md:mb-8 md:col-start-1 ${!videos && !isLoading && !error ? "md:mb-8 md:row-start-3 md:row-end-4 md:col-end-3": "md:col-end-2 md:row-start-3 md:row-end-3 md:mb-10"}`}>
				
                <CanvasButton dispatch={dispatch}/>

                <MoreInfoButton dispatch={dispatch}/>
			
		    </div>}
        
            
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

        canvas.onmouseout = () => {
            drawing = false;
            ctx.stroke();
            ctx.beginPath();
        };

        canvas.ontouchstart = (e) => {
            e.preventDefault();
            drawing = true;
            const touch = e.touches[0];
            const x = touch.clientX - canvasOffsetX;
            const y = touch.clientY - canvasOffsetY;
            ctx.beginPath();
            ctx.moveTo(x, y);
        };

        canvas.ontouchmove = (e) => {
            if (!drawing) return;
            e.preventDefault();
            const touch = e.touches[0];
            const x = touch.clientX - canvasOffsetX;
            const y = touch.clientY - canvasOffsetY;
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

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                const tempCtx = tempCanvas.getContext('2d');
                
                tempCtx.fillStyle = 'white';
                tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
                
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
            canvas.ontouchstart = null;
            canvas.ontouchmove = null;
            canvas.ontouchend = null;
            canvas.onresize = null;
        };
    }, []);

   
    return (
        
       <div className="flex flex-col  justify-center items-center gap-5 md:gap-10 mx-5 mb-5 md:mb-0 md:row-start-2 md:row-end-4 md:col-start-1 md:col-end-3">
            <canvas
                ref={canvasRef}
                className="border-4 border-[#4682A9] rounded-xl bg-[#FFFFFF] w-full md:max-w-[500px] lg:max-w-[600px] xl:max-w-[800px] 2xl:max-w-[1000px] h-[65vh]"
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

const CanvasButton = ({dispatch}) => {
    const handleClick = () => {
        dispatch({ type: "canvas_mode" });
    };

    return (
        <button
        onClick={handleClick}
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
