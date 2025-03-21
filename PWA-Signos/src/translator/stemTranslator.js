import { findClosest } from "./arroTranslator";

const stemToSignotation = (stem, arros) => {
    const rot = stem['tags']['ROT'];
    const shape = stem['tags']['SHAPE'];
    const [cx, cy, h, w] = stem['box'];
    let arro1, arro2, dir;
    let rep = false;

    switch (rot){
        case 'N': // Vertical
            arro1 = findClosest(cx, cy - h/2, arros); // Find arrow North
            arro2 = findClosest(cx, cy + h/2, arros); // Find arrow South

            if(arro1 === undefined && arro2 === undefined) // Shoulders, waists, forearms or complex movements are ignored
                break;
            if(arro1 != undefined && arro2 === undefined){ // Arrow north
                dir = shape === 's' ? 'F' : 'H';
                rep = arro1[1];
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow south
                dir = shape === 's' ? 'B' : 'L';
                rep = arro2[1];
            }
            else{ // Arrow on both sides
                dir = shape === 's' ? 'F' : 'H';
                rep = true;
            }
            break;
        case 'NE':
            arro1 = findClosest(cx + w/2, cy - h/2, arros);  // Find arrow North East
            arro2 = findClosest(cx - w/2, cy + h/2, arros);  // Find arrow South West

            if(arro1 === undefined && arro2 === undefined) // Shoulders, waists, forearms or complex movements are ignored
                break;
            if(arro1 != undefined && arro2 === undefined){ // Arrow north east
                dir = shape === 's' ? 'FY' : 'HY';
                rep = arro1[1];
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow south west
                dir = shape === 's' ? 'BX' : 'LX';
                rep = arro2[1];
            }
            else{ // Arrow on both sides
                dir = shape === 's' ? 'FY' : 'HY';
                rep = true;
            }
            break;
        case 'E': // Horizontal
            arro1 = findClosest(cx + w/2, cy, arros);  // Find arrow East
            arro2 = findClosest(cx - w/2, cy, arros);  // Find arrow West

            if(arro1 === undefined && arro2 === undefined) // Shoulders, waists, forearms or complex movements are ignored
                break;
            if(arro1 != undefined && arro2 === undefined){ // Arrow east
                dir = 'Y';
                rep = arro1[1];
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow west
                dir = 'X';
                rep = arro2[1];
            }
            else{ // Arrow on both sides
                dir = 'Y';
                rep = true;
            }
            break;
        case 'SE':
            arro1 = findClosest(cx - w/2, cy - h/2, arros);  // Find arrow North West
            arro2 = findClosest(cx + w/2, cy + h/2, arros);  // Find arrow South East

            if(arro1 === undefined && arro2 === undefined) // Shoulders, waists, forearms or complex movements are ignored
                break;
            if(arro1 != undefined && arro2 === undefined){ // Arrow north west
                dir = shape === 's' ? 'FX' : 'HX';
                rep = arro1[1];
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow south east
                dir = shape === 's' ? 'BY' : 'LY';
                rep = arro2[1];
            }
            else{
                dir = shape === 's' ? 'FX' : 'HX';
                rep = true;
            }
            break;
        default:
            break;
    }

    stem["tags"]["SIGNOTATION"] = dir === undefined ? "" : '->:' + dir;
    stem["tags"]["REP"] = rep;
};

export default stemToSignotation;