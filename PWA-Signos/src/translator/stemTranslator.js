import { findClosest } from "./arroTranslator";

const stemToSignotation = (stem, arros) => {
    const rot = stem['tags']['ROT'];
    const shape = stem['tags']['SHAPE'];
    const [cx, cy, h, w] = stem['box'];
    let arro1, arro2, dir;
    let extra = undefined;

    switch (rot){
        case 'N': // Vertical
            arro1 = findClosest(cx, cy - h/2, arros); // Find arrow North
            arro2 = findClosest(cx, cy + h/2, arros); // Find arrow South

            if(arro1 === undefined && arro2 === undefined) // Shoulders, waists, forearms or complex movements are ignored
                break;
            if(arro1 != undefined && arro2 === undefined){ // Arrow north
                dir = shape === 's' ? 'F' : 'H';
                extra = arro1[1] ? 'R' : undefined;
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow south
                dir = shape === 's' ? 'B' : 'L';
                extra = arro2[1] ? 'R' : undefined;
            }
            else{ // Arrow on both sides
                dir = '';
                extra = 'N';
            }
            break;
        case 'NE':
            arro1 = findClosest(cx + w/2, cy - h/2, arros);  // Find arrow North East
            arro2 = findClosest(cx - w/2, cy + h/2, arros);  // Find arrow South West

            if(arro1 === undefined && arro2 === undefined) // Shoulders, waists, forearms or complex movements are ignored
                break;
            if(arro1 != undefined && arro2 === undefined){ // Arrow north east
                dir = shape === 's' ? 'FY' : 'HY';
                extra = arro1[1] ? 'R' : undefined;
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow south west
                dir = shape === 's' ? 'BX' : 'LX';
                extra = arro2[1] ? 'R' : undefined;
            }
            else{ // Arrow on both sides
                dir = "";
                extra = 'N';
            }
            break;
        case 'E': // Horizontal
            arro1 = findClosest(cx + w/2, cy, arros);  // Find arrow East
            arro2 = findClosest(cx - w/2, cy, arros);  // Find arrow West

            if(arro1 === undefined && arro2 === undefined) // Shoulders, waists, forearms or complex movements are ignored
                break;
            if(arro1 != undefined && arro2 === undefined){ // Arrow east
                dir = 'Y';
                extra = arro1[1] ? 'R' : undefined;
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow west
                dir = 'X';
                extra = arro2[1] ? 'R' : undefined;
            }
            else{ // Arrow on both sides
                dir = "";
                extra = 'N';
            }
            break;
        case 'SE':
            arro1 = findClosest(cx - w/2, cy - h/2, arros);  // Find arrow North West
            arro2 = findClosest(cx + w/2, cy + h/2, arros);  // Find arrow South East

            if(arro1 === undefined && arro2 === undefined) // Shoulders, waists, forearms or complex movements are ignored
                break;
            if(arro1 != undefined && arro2 === undefined){ // Arrow north west
                dir = shape === 's' ? 'FX' : 'HX';
                extra = arro1[1] ? 'R' : undefined;
            }
            else if(arro2 != undefined && arro1 === undefined){ // Arrow south east
                dir = shape === 's' ? 'BY' : 'LY';
                extra = arro2[1] ? 'R' : undefined;
            }
            else{
                dir = "";
                extra = 'N';
            }
            break;
        default:
            break;
    }

    stem["tags"]["SIGNOTATION"] = dir === undefined ? undefined : '->:' + dir;
    stem["tags"]["EXTRA"] = extra;
};

export default stemToSignotation;