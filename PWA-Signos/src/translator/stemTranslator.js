import distanceTo from "./distance";

const stemToSignotation = (stem, graphemes) => {
    const rot = stem['tags']['ROT'];
    const shape = stem['tags']['SHAPE'];
    const [cx, cy, h, w] = stem['box'];

    switch (rot){
        case 'N': // Vertical
            distanceTo(cx, cy + h/2, graphemes, 'N')
            distanceTo(cx, cy - h/2, graphemes, 'S')
            break;
        case 'NE':
            distanceTo(cx + w/2, cy + h/2, graphemes, 'NE')
            distanceTo(cx - w/2, cy - h/2, graphemes, 'SW')
            break;
        case 'E': // Horizontal
            distanceTo(cx + w/2, cy, graphemes, 'E')
            distanceTo(cx - w/2, cy, graphemes, 'W')
            break;
        case 'SE':
            distanceTo(cx - w/2, cy + h/2, graphemes, 'NW')
            distanceTo(cx + w/2, cy - h/2, graphemes, 'SE')
            break;
        default:
            break;
    }
};

export default stemToSignotation;