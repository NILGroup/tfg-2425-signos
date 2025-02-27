import { findClosest } from "./arroTranslator.js";

const incompleteArcs = (arc, arros) => {
  const rot = arc["tags"]["ROT"];
  const shape = arc["tags"]["SHAPE"][0];
  const [cx, cy, h, w] = arc["box"];
  let arro1, arro2, dir, coda;
  let rep = false;

  switch (rot) {
    case "N": // Middle point of the ARC segment
      arro1 = findClosest(cx - w / 2, cy + h / 2, arros); // Find West arrow
      arro2 = findClosest(cx + w / 2, cy + h / 2, arros); // Find East arrow

      dir = shape === "s" ? "F" : "H";
      if (arro1 === undefined && arro2 === undefined)
        return "(" + dir + ")";
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        coda = "X";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "Y";
        rep = arro2[1];
      }
      break;
    case "NE":
      arro1 = findClosest(cx - w / 2, cy - h / 2, arros); // Find North arrow
      arro2 = findClosest(cx + w / 2, cy + h / 2, arros); // Find East arrow

      dir = shape === "s" ? "FY" : "HY";
      if (arro1 === undefined && arro2 === undefined)
        return "(" + dir + ")";
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "F" : "H";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "Y";           // Y o B/L ?
        rep = arro2[1];
      }
      break;
    case "E":
      arro1 = findClosest(cx - w / 2, cy - h / 2, arros); // Find North arrow
      arro2 = findClosest(cx - w / 2, cy + h / 2, arros); // Find South arrow

      dir = "Y";
      if (arro1 === undefined && arro2 === undefined)
        return  "(" + dir + ")";
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "F" : "H";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = shape === "s" ? "B" : "L";
        rep = arro2[1];
      }
      break;
    case "SE":
      arro1 = findClosest(cx - w / 2, cy + h / 2, arros); // Find South arrow
      arro2 = findClosest(cx + w / 2, cy - h / 2, arros); // Find East arrow

      dir = shape === "s" ? "BY" : "LY";
      if (arro1 === undefined && arro2 === undefined)
        return  "(" + dir + ")";
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "B" : "L";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "Y";
        rep = arro2[1];
      }
      break;
    case "S":
      arro1 = findClosest(cx + w/2, cy - h/2, arros); // Find East arrow
      arro2 = findClosest(cx - w/2, cy - h/2, arros); // Find West arrow

      dir = shape === "s" ? "B" : "L";
      if (arro1 === undefined && arro2 === undefined)
        return  "(" + dir + ")";
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        coda = "Y";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "X";
        rep = arro2[1];
      }
      break;
    case "SW":
      arro1 = findClosest(cx + w/2, cy + h/2, arros); // Find South arrow
      arro2 = findClosest(cx - w/2, cy - h/2, arros); // Find West arrow

      dir = shape === "s" ? "BX" : "LX";
      if (arro1 === undefined && arro2 === undefined)
        return  "(" + dir + ")";
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "B" : "L";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "X";
        rep = arro2[1];
      }
      break;
    case "W":
      arro1 = findClosest(cx + w/2, cy - h/2, arros); // Find North arrow
      arro2 = findClosest(cx + w/2, cy + h/2, arros); // Find South arrow

      dir = "X";
      if (arro1 === undefined && arro2 === undefined)
        return  "(" + dir + ")";
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "F" : "H";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = shape === "s" ? "B" : "L";
        rep = arro2[1];
      }
      break;
    case "NW":
      arro1 = findClosest(cx + w/2, cy - h/2, arros); // Find North arrow
      arro2 = findClosest(cx - w/2, cy + h/2, arros); // Find West arrow

      dir = shape === "s" ? "FX" : "HX";
      if (arro1 === undefined && arro2 === undefined)
        return  "(" + dir + ")";
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "F" : "H";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "X";
        rep = arro2[1];
      }
      break;
    default:
      break;
  }
  
  return ["(" + dir + "):" + coda, rep] ;
};

const fullArcs = (arc, arros) => {
  const rot = arc["tags"]["ROT"];
  const shape = arc["tags"]["SHAPE"][0];
  const [cx, cy, h, w] = arc["box"];
  let arro1, arro2, dir;
  let rep = false;
  let arroRot = undefined;

  // El movimiento es un circulo completo
  switch (rot) {
    case "N":
    case "NE":
    case "NW":
      arroRot = findMyArro(
        arc["box"][0],
        arc["box"][1],
        ["SE", "E", "W", "SW"],
        graphemes
      );
      if (shape[0] === "s") return arroRot === "W" ? "(B,X)" : "(B,Y)";

      return arroRot === "W" ? "(L,X)" : "(L,Y)";
    case "E":
      arroRot = findMyArro(
        arc["box"][0],
        arc["box"][1],
        ["N", "NW", "S", "SW"],
        graphemes
      );
      if (shape[0] === "s") return arroRot === "N" ? "(X,F)" : "(X,B)";

      return arroRot === "N" ? "(X,H)" : "(X,L)";
    case "S":
    case "SE":
    case "SW":
      arroRot = findMyArro(
        arc["box"][0],
        arc["box"][1],
        ["W", "E"],
        graphemes
      );
      if (shape[0] === "s") return arroRot === "W" ? "(F,Y)" : "(F,X)";

      return arroRot === "W" ? "(H,Y)" : "(H,X)";
    case "W":
      arroRot = findMyArro(
        arc["box"][0],
        arc["box"][1],
        ["N", "S"],
        graphemes
      );
      if (shape[0] === "s") return arroRot === "W" ? "(Y,B)" : "(Y,F)";

      return arroRot === "W" ? "(Y,L)" : "(Y,H)";
    default:
      break;
  }
};

const arcToSignotation = (arc, arros) => {
  const shape = arc["tags"]["SHAPE"];
  
  if (shape[1] == "q" || shape[1] == "h") {
    // Traduction for quarter and half arcs is the same
    return incompleteArcs(arc, arros);
  } else {
    return fullArcs();
  }
};

export default arcToSignotation;
