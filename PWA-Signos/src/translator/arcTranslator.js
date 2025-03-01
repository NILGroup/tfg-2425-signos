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
        return ["(" + dir + ")", rep];
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
        return ["(" + dir + ")", rep];
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
        return  ["(" + dir + ")", rep];
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
        return  ["(" + dir + ")", rep];
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
        return  ["(" + dir + ")", rep];
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
        return  ["(" + dir + ")", rep];
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
        return  ["(" + dir + ")", rep];
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
        return  ["(" + dir + ")", rep];
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
  let arro;
  let ini = "", dir = "";
  let rep = false;

  // El movimiento es un circulo completo
  switch (rot) {
    case "N":
    case "NE":
    case "NW":
      arro = findClosest(cx, cy + h / 4, arros);
      if (arro===undefined) break;
      if (arro[0]["ROT"] === "NW" || arro[0]["ROT"] === "W" || arro[0]["ROT"] === "SW")   // Arrow pointing to the left
        dir = "X";
      else if (arro[0]["ROT"] === "NE" || arro[0]["ROT"] === "E" || arro[0]["ROT"] === "SE")  // Arrow pointing to the right
        dir = "Y";
      ini = (shape === "s") ? "B" : "L";
      break;
    case "E":
      if (arro===undefined) break;
      arro = findClosest(cx - w / 4, cy, arros);
      if (arro[0]["ROT"] === "NE" || arro[0]["ROT"] === "N" || arro[0]["ROT"] === "NW")   // Arrow pointing to the north
        dir = (shape === "s") ? "F" : "H";
      else if (arro[0]["ROT"] === "SE" || arro[0]["ROT"] === "S" || arro[0]["ROT"] === "SW")  // Arrow pointing to the south
        dir = (shape === "s") ? "B" : "L";  
      ini = "X";
      break;
    case "S":
    case "SE":
    case "SW":
      arro = findClosest(cx, cy - h / 4, arros);
      if (arro===undefined) break;
      if (arro[0]["ROT"] === "NW" || arro[0]["ROT"] === "W" || arro[0]["ROT"] === "SW")   // Arrow pointing to the left
        dir = "X";
      else if (arro[0]["ROT"] === "NE" || arro[0]["ROT"] === "E" || arro[0]["ROT"] === "SE")  // Arrow pointing to the right
        dir = "Y";
      ini = (shape === "s") ? "F" : "H";
      break;
    case "W":
      arro = findClosest(cx + w / 4, cy, arros);
      if (arro===undefined) break;
      if (arro[0]["ROT"] === "NE" || arro[0]["ROT"] === "N" || arro[0]["ROT"] === "NW")   // Arrow pointing to the north
        dir = (shape === "s") ? "F" : "H";
      else if (arro[0]["ROT"] === "SE" || arro[0]["ROT"] === "S" || arro[0]["ROT"] === "SW")  // Arrow pointing to the south
        dir = (shape === "s") ? "B" : "L";  
      ini = "Y";
      break;
    default:
      break;
  }

  if (arro != undefined) rep = arro[1]; // Double arrow

  return ["(" + ini + "," + dir + ")", rep] ;
};

const arcToSignotation = (arc, arros) => {
  const shape = arc["tags"]["SHAPE"];
  let signotation = undefined;

  if (shape[1] == "q" || shape[1] == "h") {
    // Traduction for quarter and half arcs is the same
    signotation = incompleteArcs(arc, arros);
  } else {
    // Traduction for full arcs
    signotation = fullArcs(arc, arros);
  }
  arc["tags"]["SIGNOTATION"] = signotation[0];
  arc["tags"]["REP"] = signotation[1];
};

export default arcToSignotation;
