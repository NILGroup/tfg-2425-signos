import { useEffect, useRef } from "react";
import clearIcon from '../assets/delete.svg';
import checkIcon from '../assets/check.svg';

const Canvas = (isLoading, dispatch) => {
    const canvasRef = useRef(null);
    const toolbarRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const toolbar = toolbarRef.current;
        if (!canvas || !toolbar) return;

        const ctx = canvas.getContext("2d");

        const canvasOffsetX = canvas.offsetLeft;
        const canvasOffsetY = canvas.offsetTop;
        const canvasMarginTop = 10;

        canvas.width = window.innerWidth - canvasOffsetX * 2;
        canvas.height = window.innerHeight - canvasOffsetY * 2 - canvasMarginTop;

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

        toolbar.onclick = (e) => {
            if (e.target.id === "clear") {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            else if (e.target.id === "check") {
                let dataURL = canvas.toDataURL();
                // handleFileUpload -> subir imagen a VisSE
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
        <div className="justify-center items-center flex flex-col">
            <canvas ref={canvasRef} className="h-140 bg-[#FFFFFF] ml-8 my-10 " id="canvas" />
            <div ref={toolbarRef} id="toolbar" className="flex flex-row gap-10">
                <button id="clear" className="border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20 cursor-pointer">
                    <img src={clearIcon} id="clear" alt="Clear Icon" className="hover:brightness-0 hover:invert"/>
                </button>
                <button id="check" className="border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-20 h-20 cursor-pointer">
                    <img src={checkIcon} id="check" alt="Clear Icon" className="hover:brightness-0 hover:invert"/>
                </button>
            </div>
        </div>
    );
};

export default Canvas;
