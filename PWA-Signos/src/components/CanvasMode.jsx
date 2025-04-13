import { useEffect, useRef } from "react";
import clearIcon from "../assets/delete.svg";
import checkIcon from "../assets/check.svg";
import { connection } from "../connection.js";
import { Image } from "./ImageMode.jsx";

const CanvasMode = ({ image, imageName, dispatch }) => {
    return (
        <div className="flex flex-col items-center">
            <Canvas dispatch={dispatch}/>
            <Image image={image} imageName={imageName}/>
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
                // Fill with white background
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Draw original canvas content on top
                ctx.drawImage(canvas, 0, 0);
                
             canvas.toBlob((blob) => {
                     
                    const image = new File([blob], "SignoEscritura", { type: blob.type })

                    dispatch({
                        type: "upload_canvas",
                        file: image,
                    });
                    const upload = new FormData();
                    upload.append("image", image);
                    console.log(upload);
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

    const handleCanvasUpload = () => {
        
        canvasRef.current.toBlob((blob) => {
            image = new File([blob], "SignoEscritura", { type: blob.type })
        }, "image/png");

        dispatch({
            type: "select_image",
            file: image,
        });
        const upload = new FormData();
        upload.append("image", image);
        // Send selected image to VisSE
        uploadImage(upload);
    };

    return (
        <div className="justify-center items-center flex flex-col">
            <canvas
                ref={canvasRef}
                className="h-140 bg-[#FFFFFF] ml-8 my-10 "
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
