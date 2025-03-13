import { useEffect, useRef } from "react";

const Canvas = () => {
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
            <canvas ref={canvasRef} className="h-140 bg-[#FFFFFF] my-10 " id="canvas" />
            <div ref={toolbarRef} id="toolbar">
                <button id="clear" className="clear-button bg-[#FFFFFF] w-20 h-20">
                    Borrar
                </button>
            </div>
            
        </div>
    );
};

export default Canvas;
