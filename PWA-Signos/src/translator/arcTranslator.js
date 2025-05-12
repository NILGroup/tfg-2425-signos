import { findClosest } from "./arroTranslator.js";

const incompleteArcs = (arc, arros) => {
  const rot = arc["grapheme"]["ROT"];
  const shape = arc["grapheme"]["SHAPE"][0];
  const [cx, cy, h, w] = [arc["explanation"]["left"] + arc["explanation"]["width"] / 2, arc["explanation"]["top"] + arc["explanation"]["height"] / 2,
                          arc["explanation"]["height"], arc["explanation"]["width"]];
  let arro1, arro2, dir, coda;
  let extra = undefined;

  switch (rot) {
    case "N": // Middle point of the ARC segment
      arro1 = findClosest(cx - w / 2, cy + h / 2, arros); // Find West arrow
      arro2 = findClosest(cx + w / 2, cy + h / 2, arros); // Find East arrow

      dir = shape === "s" ? "F" : "H";
      if (arro1 === undefined && arro2 === undefined)
        return ["(" + dir + ")", extra];
      if (arro1 != undefined && arro2 === undefined) {
        coda = "X";
        extra = arro1[1] ? "R" : undefined;
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "Y";
        extra = arro2[1] ? "R" : undefined;
      }
      else{
        coda = "";
        extra = "N";
      }
      break;
    case "NE":
      arro1 = findClosest(cx - w / 2, cy - h / 2, arros); // Find North arrow
      arro2 = findClosest(cx + w / 2, cy + h / 2, arros); // Find East arrow

      dir = shape === "s" ? "FY" : "HY";
      if (arro1 === undefined && arro2 === undefined)
        return ["(" + dir + ")", extra];
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "F" : "H";
        extra = arro1[1] ? "R" : undefined;
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "Y";           // Y o B/L ?
        extra = arro2[1] ? "R" : undefined;
      }
      else { // Arrow on both sides
        coda = "";
        extra = "N";
      }
      break;
    case "E":
      arro1 = findClosest(cx - w / 2, cy - h / 2, arros); // Find North arrow
      arro2 = findClosest(cx - w / 2, cy + h / 2, arros); // Find South arrow

      dir = "Y";
      if (arro1 === undefined && arro2 === undefined)
        return  ["(" + dir + ")", extra];
      
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "F" : "H";
        extra = arro1[1] ? "R" : undefined;
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = shape === "s" ? "B" : "L";
        extra = arro2[1] ? "R" : undefined;
      }
      else {
        coda = "";
        extra = "N";
      }
      break;
    case "SE":
      arro1 = findClosest(cx - w / 2, cy + h / 2, arros); // Find South arrow
      arro2 = findClosest(cx + w / 2, cy - h / 2, arros); // Find East arrow

      dir = shape === "s" ? "BY" : "LY";
      if (arro1 === undefined && arro2 === undefined)
        return  ["(" + dir + ")", extra];
      
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "B" : "L";
        extra = arro1[1] ? "R" : undefined;
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "Y";
        extra = arro2[1] ? "R" : undefined;
      }
      else{
        coda = "";
        extra = "N";
      }
      break;
    case "S":
      arro1 = findClosest(cx + w/2, cy - h/2, arros); // Find East arrow
      arro2 = findClosest(cx - w/2, cy - h/2, arros); // Find West arrow

      dir = shape === "s" ? "B" : "L";
      if (arro1 === undefined && arro2 === undefined)
        return  ["(" + dir + ")", extra];
      
      if (arro1 != undefined && arro2 === undefined) {
        coda = "Y";
        extra = arro1[1] ? "R" : undefined;
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "X";
        extra = arro2[1] ? "R" : undefined;
      }
      else{
        coda = "";
        extra = "N";
      }
      break;
    case "SW":
      arro1 = findClosest(cx + w/2, cy + h/2, arros); // Find South arrow
      arro2 = findClosest(cx - w/2, cy - h/2, arros); // Find West arrow

      dir = shape === "s" ? "BX" : "LX";
      if (arro1 === undefined && arro2 === undefined)
        return  ["(" + dir + ")", extra];
      
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "B" : "L";
        extra = arro1[1] ? "R" : undefined;
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "X";
        extra = arro2[1] ? "R" : undefined;
      }
      else{
        coda = "";
        extra = "N";
      }
      break;
    case "W":
      arro1 = findClosest(cx + w/2, cy - h/2, arros); // Find North arrow
      arro2 = findClosest(cx + w/2, cy + h/2, arros); // Find South arrow

      dir = "X";
      if (arro1 === undefined && arro2 === undefined)
        return  ["(" + dir + ")", extra];
      
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "F" : "H";
        extra = arro1[1] ? "R" : undefined;
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = shape === "s" ? "B" : "L";
        extra = arro2[1] ? "R" : undefined;
      }
      else{
        coda = "";
        extra = "N";
      }
      break;
    case "NW":
      arro1 = findClosest(cx + w/2, cy - h/2, arros); // Find North arrow
      arro2 = findClosest(cx - w/2, cy + h/2, arros); // Find West arrow

      dir = shape === "s" ? "FX" : "HX";
      if (arro1 === undefined && arro2 === undefined)
        return  ["(" + dir + ")", extra];
      
      if (arro1 != undefined && arro2 === undefined) {
        coda = shape === "s" ? "F" : "H";
        extra = arro1[1] ? "R" : undefined;
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = "X";
        extra = arro2[1] ? "R" : undefined;
      }
      else{
        coda = "";
        extra = "N";
      }
      break;
    default:
      break;
  }
  
  return ["(" + dir + "):" + coda, extra] ;
};

const fullArcs = (arc, arros) => {
  const rot = arc["grapheme"]["ROT"];
  const shape = arc["grapheme"]["SHAPE"][0];
  const [cx, cy, h, w] = [arc["explanation"]["left"] + arc["explanation"]["width"] / 2, arc["explanation"]["top"] + arc["explanation"]["height"] / 2,
                          arc["explanation"]["height"], arc["explanation"]["width"]];
  let arro;
  let ini = "", dir = "";
  let extra = false;

  // Movement is a full arc
  switch (rot) {
    case "N":
    case "NE":
    case "NW":
      arro = findClosest(cx, cy + h / 3, arros);
      if (arro===undefined) break;
      if (arro[0]["ROT"] === "NW" || arro[0]["ROT"] === "W" || arro[0]["ROT"] === "SW")   // Arrow pointing to the left
        dir = "X";
      else if (arro[0]["ROT"] === "NE" || arro[0]["ROT"] === "E" || arro[0]["ROT"] === "SE")  // Arrow pointing to the right
        dir = "Y";
      ini = (shape === "s") ? "B" : "L";
      break;
    case "E":
      if (arro===undefined) break;
      arro = findClosest(cx - w / 3, cy, arros);
      if (arro[0]["ROT"] === "NE" || arro[0]["ROT"] === "N" || arro[0]["ROT"] === "NW")   // Arrow pointing to the north
        dir = (shape === "s") ? "F" : "H";
      else if (arro[0]["ROT"] === "SE" || arro[0]["ROT"] === "S" || arro[0]["ROT"] === "SW")  // Arrow pointing to the south
        dir = (shape === "s") ? "B" : "L";  
      ini = "X";
      break;
    case "S":
    case "SE":
    case "SW":
      arro = findClosest(cx, cy - h / 3, arros);
      if (arro===undefined) break;
      if (arro[0]["ROT"] === "NW" || arro[0]["ROT"] === "W" || arro[0]["ROT"] === "SW")   // Arrow pointing to the left
        dir = "X";
      else if (arro[0]["ROT"] === "NE" || arro[0]["ROT"] === "E" || arro[0]["ROT"] === "SE")  // Arrow pointing to the right
        dir = "Y";
      ini = (shape === "s") ? "F" : "H";
      break;
    case "W":
      arro = findClosest(cx + w / 3, cy, arros);
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

  if (arro != undefined) extra = arro[1] ? "R" : undefined; // Double arrow

  return ["(" + ini + "," + dir + ")", extra] ;
};

const arcToSignotation = (arc, arros) => {
  const shape = arc["grapheme"]["SHAPE"];
  let signotation = undefined;

  if (shape[1] == "q" || shape[1] == "h") {
    // Traduction for quarter and half arcs is the same
    signotation = incompleteArcs(arc, arros);
  } else {
    // Traduction for full arcs
    signotation = fullArcs(arc, arros);
  }
  arc["signotation"] = signotation[0];
  arc["extra"] = signotation[1];
};

export default arcToSignotation;
