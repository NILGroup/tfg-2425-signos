const Canvas = () => {

    const canvas = document.getElementById('canvas');
    const toolbar = document.getElementById('toolbar');
    const ctx = canvas.getContext("2d");

    const canvasOffsetX = canvas.offsetLeft;
    const canvasOffsetY = canvas.offsetTop;

    canvas.width = window.innerWidth - canvasOffsetX;
    canvas.height = window.innerHeight - canvasOffsetY;

    let drawing = false;
    let x;
    let y;

    canvas.onmousedown = (e) => {
        drawing = true;
        canvas.onmousemove = (x, y) => {
            x = e.clientX - canvasOffsetX;
            y = e.clientY - canvasOffsetY;
            draw(x, y);
        }
    };

    canvas.onmouseup = (e) => {
        drawing = false;
        ctx.stroke();
        ctx.beginPath();
    };

    const draw = (x, y) => {
        if (!drawing) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.lineTo(x, y);
        ctx.stroke();
        //ctx.moveTo(x, y);
    };

    toolbar.onclick = (e) => {
        if (e.target.id === 'clear') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

};

export default Canvas;