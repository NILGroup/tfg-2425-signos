import React, { useState, useEffect, useRef, useCallback } from 'react';
import eraseAllIcon from '../assets/erase-all.svg';
import penIcon from '../assets/pen.svg';
import eraserIcon from '../assets/eraser.svg';
import penUnselIcon from '../assets/pen-unselected.svg';
import eraserUnselIcon from '../assets/eraser-unselected.svg';

class Coordinate {
    constructor( x, y ) {
        this.x = x;
        this.y = y;
    }
}

const DRAWING_TOOLS = {
    PEN: 'pen',
    ERASER: 'eraser',
}

const DrawingToolSelected = () => {
    // By default the pen tool is selected
    const [selectedTool, setSelectedTool] = useState(DRAWING_TOOLS.PEN);

    const handleSelect = (tool) => {
        setSelectedTool(tool);
    }

    return <div>
        <DrawingToolsButton isSelected={selectedTool === DRAWING_TOOLS.PEN} handleClick={() => handleSelect(DRAWING_TOOLS.PEN)} imageSel={penIcon} imageUnsel={penUnselIcon} toolName='Lápiz'/>
        <DrawingToolsButton isSelected={selectedTool === DRAWING_TOOLS.ERASER} handleClick={() => handleSelect(DRAWING_TOOLS.ERASER)} imageSel={eraserIcon} imageUnsel={eraserUnselIcon} toolName='Goma'/>
        <EraseAllButton handleClick={() => handleSelect(DRAWING_TOOLS.PEN)} image={eraseAllIcon}/>
    </div>
}

const DrawingToolsButton = ({isSelected, handleClick, imageSel, imageUnsel, toolName}) => {
    const className = isSelected ? 'drawing-tool-selected' : 'drawing-tool-unselected';
    const text = isSelected ? 'Selected' : 'Unselected';
  
    const image = isSelected ? imageSel : imageUnsel;

    return <><button className={className} onClick={handleClick}>
    <img src={image} alt={toolName} />
      </button></>
}

const EraseAllButton = ({handleClick, image}) => {
    return <><button className='drawing-tool-erase-all' onClick={handleClick}>
    <img src={image} alt='Borrar todo' />
    </button></>
}

const Canvas = () => {
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState(undefined);
    
    const canvasRef = useRef(null);

    const startPaint = useCallback((event) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, [startPaint]);

    const getCoordinates = (event) => {
        if (!canvasRef.current) {
            return;
        }
    
        const canvas = canvasRef.current;
        return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
    };

    const paint = useCallback(
        (event) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition]
    );

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);


    const drawLine = (originalMousePosition, newMousePosition) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            context.strokeStyle = 'black';
            context.lineJoin = 'round';
            context.lineWidth = 3;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();

            context.stroke();
        }
    };

    const exitPaint = useCallback(() => {
        setIsPainting(false);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    return <>
        <DrawingToolSelected />
        <canvas ref={canvasRef} />
        </>;
};

export default Canvas;

