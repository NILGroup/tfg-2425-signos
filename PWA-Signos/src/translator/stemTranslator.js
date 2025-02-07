import findClosest from "./arroTranslator";

const stemToSignotation = (stem, graphemes) => {
    const rot = stem['tags']['ROT'];
    const shape = stem['tags']['SHAPE'];
    const [cx, cy, h, w] = stem['box'];

    switch (rot){
        case 'N': // Vertical
            findClosest(cx, cy + h/2, graphemes, 'N');
            findClosest(cx, cy - h/2, graphemes, 'S');
            break;
        case 'NE':
            findClosest(cx + w/2, cy + h/2, graphemes, 'NE');
            findClosest(cx - w/2, cy - h/2, graphemes, 'SW');
            break;
        case 'E': // Horizontal
            findClosest(cx + w/2, cy, graphemes, 'E');
            findClosest(cx - w/2, cy, graphemes, 'W');
            break;
        case 'SE':
            findClosest(cx - w/2, cy + h/2, graphemes, 'NW');
            findClosest(cx + w/2, cy - h/2, graphemes, 'SE');
            break;
        default:
            break;
    }
};

export default stemToSignotation;