import { findClosest } from "./arroTranslator";

const stemToSignotation = (stem, arros) => {
    const rot = stem['grapheme']['ROT'];
    const shape = stem['grapheme']['SHAPE'];
    const [cx, cy, h, w] = [stem["explanation"]["left"] + stem["explanation"]["width"] / 2, stem["explanation"]["top"] + stem["explanation"]["height"] / 2,
                            stem["explanation"]["height"], stem["explanation"]["width"]];
    let arro1, arro2, dir;
    let extra = undefined; 
    let arroDescription = ' La punta de la flecha indica que el movimiento es hacia ';

    switch (rot){
        case 'N': // Vertical
            arro1 = findClosest(cx, cy - h/2, arros); // Find arrow North
            arro2 = findClosest(cx, cy + h/2, arros); // Find arrow South

            if(arro1 === undefined && arro2 === undefined){ // Shoulders, waists, forearms or complex movements are ignored
                arroDescription = "";
                break;
            }
            if(arro1 != undefined && arro2 === undefined){ // Arrow north
                dir = shape === 's' ? 'F' : 'H';
                extra = arro1[1] ? 'R' : undefined;
                arroDescription += shape === 's' ? 'el frente' : 'arriba';
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow south
                dir = shape === 's' ? 'B' : 'L';
                extra = arro2[1] ? 'R' : undefined;
                arroDescription += shape === 's' ? 'atrás' : 'abajo';
            }
            else{ // Arrow on both sides
                dir = '';
                extra = 'N';
                arroDescription = " Las puntas de flecha a cada lado indican que es un movimiento de vaivén " + 
                                    shape === 's' ?  "de delante a atrás" : "de arriba a abajo";
            }
            break;
        case 'NE':
            arro1 = findClosest(cx + w/2, cy - h/2, arros);  // Find arrow North East
            arro2 = findClosest(cx - w/2, cy + h/2, arros);  // Find arrow South West

            if(arro1 === undefined && arro2 === undefined){ // Shoulders, waists, forearms or complex movements are ignored
                arroDescription = "";
                break;
            }
            if(arro1 != undefined && arro2 === undefined){ // Arrow north east
                dir = shape === 's' ? 'FY' : 'HY';
                extra = arro1[1] ? 'R' : undefined;
                arroDescription += shape === 's' ? 'el frente a la derecha' : 'arriba a la derecha';
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow south west
                dir = shape === 's' ? 'BX' : 'LX';
                extra = arro2[1] ? 'R' : undefined;
                arroDescription += shape === 's' ? 'atrás a la izquierda' : 'abajo a la izquierda';
            }
            else{ // Arrow on both sides
                dir = "";
                extra = 'N';
                arroDescription = " Las puntas de flecha a cada lado indican que es un movimiento de vaivén " + 
                                    shape === 's' ?  "desde el frente a la derecha hacia atrás a la izquierda" 
                                    : "desde arriba a la derecha hacia abajo a la izquierda";
            }
            break;
        case 'E': // Horizontal
            arro1 = findClosest(cx + w/2, cy, arros);  // Find arrow East
            arro2 = findClosest(cx - w/2, cy, arros);  // Find arrow West

            if(arro1 === undefined && arro2 === undefined){ // Shoulders, waists, forearms or complex movements are ignored
                arroDescription = "";
                break;
            }
            if(arro1 != undefined && arro2 === undefined){ // Arrow east
                dir = 'Y';
                extra = arro1[1] ? 'R' : undefined;
                arroDescription += "la derecha";
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow west
                dir = 'X';
                extra = arro2[1] ? 'R' : undefined;
                arroDescription += "la izquierda";
            }
            else{ // Arrow on both sides
                dir = "";
                extra = 'N';
                arroDescription = " Las puntas de flecha a cada lado indican que es un movimiento de vaivén de derecha a izquierda";
            }
            break;
        case 'SE':
            arro1 = findClosest(cx - w/2, cy - h/2, arros);  // Find arrow North West
            arro2 = findClosest(cx + w/2, cy + h/2, arros);  // Find arrow South East

            if(arro1 === undefined && arro2 === undefined){ // Shoulders, waists, forearms or complex movements are ignored
                arroDescription = "";
                break;
            }
            if(arro1 != undefined && arro2 === undefined){ // Arrow north west
                dir = shape === 's' ? 'FX' : 'HX';
                extra = arro1[1] ? 'R' : undefined;
                arroDescription += shape === 's' ? 'el frente a la izquierda' : 'arriba a la izquierda';
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow south east
                dir = shape === 's' ? 'BY' : 'LY';
                extra = arro2[1] ? 'R' : undefined;
                arroDescription += shape === 's' ? 'atrás a la derecha' : 'abajo a la derecha';
            }
            else{
                dir = "";
                extra = 'N';
                arroDescription = " Las puntas de flecha a cada lado indican que es un movimiento de vaivén " + 
                                    shape === 's' ?  "desde el frente a la izquierda hacia atrás a la derecha" 
                                    : "desde arriba a la izquierda hacia abajo a la derecha";
                                }
            break;
        default:
            break;
    }

    stem["signotation"] = dir === undefined ? undefined : '->:' + dir;
    stem["extra"] = extra;
    stem["explanation"]["text"] += arroDescription + (extra === 'R' ? " y se repite" : "") + '.';
};

export default stemToSignotation;