import { findClosest } from "./arroTranslator.js";

// const arcToSignotation = (arc, graphemes) => {
//   const shape = arc["tags"]["SHAPE"];
//   const rot = arc["tags"]["ROT"];
//   let arroRot = undefined;

//   if (shape[1] === "f") {
//     // El movimiento es un circulo completo
//     switch (rot) {
//       case "N":
//         arroRot = findMyArro(
//           arc["box"][0],
//           arc["box"][1],
//           ["SE", "E", "W", "SW"],
//           graphemes
//         );
//         if (shape[0] === "s") return arroRot === "W" ? "(B,X)" : "(B,Y)";

//         return arroRot === "W" ? "(L,X)" : "(L,Y)";
//       case "NE":
//         arroRot = findMyArro(
//           arc["box"][0],
//           arc["box"][1],
//           ["W", "NW", "S", "SE"],
//           graphemes
//         );
//         if (shape[0] === "s") return arroRot === "NW" ? "(B,X)" : "(B,Y)";

//         return arroRot === "NW" ? "(L,X)" : "(L,Y)";
//       case "E":
//         arroRot = findMyArro(
//           arc["box"][0],
//           arc["box"][1],
//           ["N", "NW", "S", "SW"],
//           graphemes
//         );
//         if (shape[0] === "s") return arroRot === "N" ? "(X,F)" : "(X,B)";

//         return arroRot === "N" ? "(X,H)" : "(X,L)";
//       case "SE":
//         arroRot = findMyArro(
//           arc["box"][0],
//           arc["box"][1],
//           ["N", "NE", "SW", "W"],
//           graphemes
//         );
//         if (shape[0] === "s") return arroRot === "NE" ? "(F,Y)" : "(F,Y)";

//         return arroRot === "NE" ? "(H,Y)" : "(H,X)";
//       case "NW":
//         arroRot = findMyArro(
//           arc["box"][0],
//           arc["box"][1],
//           ["NE", "SW"],
//           graphemes
//         );
//         if (shape[0] === "s") return arroRot === "W" ? "(B,X)" : "(B,Y)";

//         return arroRot === "W" ? "(L,X)" : "(L,Y)";
//       case "W":
//         arroRot = findMyArro(
//           arc["box"][0],
//           arc["box"][1],
//           ["N", "S"],
//           graphemes
//         );
//         if (shape[0] === "s") return arroRot === "W" ? "(Y,B)" : "(Y,F)";

//         return arroRot === "W" ? "(Y,L)" : "(Y,H)";
//       case "SW":
//         arroRot = findMyArro(
//           arc["box"][0],
//           arc["box"][1],
//           ["NW", "SE"],
//           graphemes
//         );
//         if (shape[0] === "s") return arroRot === "W" ? "(F,Y)" : "(F,X)";

//         return arroRot === "W" ? "(H,Y)" : "(H,X)";
//       case "S":
//         arroRot = findMyArro(
//           arc["box"][0],
//           arc["box"][1],
//           ["W", "E"],
//           graphemes
//         );
//         if (shape[0] === "s") return arroRot === "W" ? "(F,Y)" : "(F,X)";

//         return arroRot === "W" ? "(H,Y)" : "(H,X)";
//       default:
//         break;
//     }
//   }
// };

const incompleteArcs = (arc, arros) => {
  const rot = arc["tags"]["ROT"];
  const shape = arc["tags"]["SHAPE"];
  const [cx, cy, h, w] = arc["box"];
  let arro1, arro2, dir, coda, rep;

  switch (rot) {
    case "N": // Middle point of the ARC segment
      arro1 = findClosest(cx - w / 2, cy + h / 2, arros); // Find West arrow
      arro2 = findClosest(cx + w / 2, cy + h / 2, arros); // Find East arrow

      dir = shape === "s" ? "F" : "H";
      if (arro1 === undefined && arro2 === undefined) // Preguntar
        return '(' + dir + ')';
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        coda = 'X';
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        coda = 'Y';
        rep = arro2[1];
      }
      break;
    case "NE":
      arro1 = findClosest(cx - w / 2, cy - h / 2, arros); // Find North arrow
      arro2 = findClosest(cx + w / 2, cy + h / 2, arros); // Find East arrow

      if (arro1 === undefined && arro2 === undefined)
        // Shoulders, waists, forearms or complex movements are ignored
        return undefined;
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        dir = shape === "s" ? "FY" : "HY";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        dir = shape === "s" ? "BX" : "LX";
        rep = arro2[1];
      }
      break;
    case "E": // Horizontal
      arro1 = findClosest(cx - w / 2, cy - h / 2, arros); // Find North arrow
      arro2 = findClosest(cx - w / 2, cy + h / 2, arros); // Find South arrow

      if (arro1 === undefined && arro2 === undefined)
        // Shoulders, waists, forearms or complex movements are ignored
        return undefined;
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        dir = "Y";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        dir = "X";
        rep = arro2[1];
      }
      break;
    case "SE":
      arro1 = findClosest(cx + w / 2, cy - h / 2, arros); // Find East arrow
      arro2 = findClosest(cx - w / 2, cy + h / 2, arros); // Find South arrow

      if (arro1 === undefined && arro2 === undefined)
        // Shoulders, waists, forearms or complex movements are ignored
        return undefined;
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        dir = shape === "s" ? "FX" : "HX";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        dir = shape === "s" ? "BY" : "LY";
        rep = arro2[1];
      }
      break;
    case "S":
      arro1 = findClosest(cx + w/2, cy - h/2, arros); // Find East arrow
      arro2 = findClosest(cx - w/2, cy - h/2, arros); // Find West arrow

      if (arro1 === undefined && arro2 === undefined)
        // Shoulders, waists, forearms or complex movements are ignored
        return undefined;
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        dir = shape === "s" ? "FX" : "HX";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        dir = shape === "s" ? "BY" : "LY";
        rep = arro2[1];
      }
      break;
    case "SW":
      arro1 = findClosest(cx + w/2, cy + h/2, arros); // Find South arrow
      arro2 = findClosest(cx - w/2, cy - h/2, arros); // Find West arrow

      if (arro1 === undefined && arro2 === undefined)
        // Shoulders, waists, forearms or complex movements are ignored
        return undefined;
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        dir = shape === "s" ? "FX" : "HX";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        dir = shape === "s" ? "BY" : "LY";
        rep = arro2[1];
      }
      break;
    case "W":
      arro1 = findClosest(cx + w/2, cy - h/2, arros); // Find North arrow
      arro2 = findClosest(cx + w/2, cy + h/2, arros); // Find South arrow

      if (arro1 === undefined && arro2 === undefined)
        // Shoulders, waists, forearms or complex movements are ignored
        return undefined;
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        dir = shape === "s" ? "FX" : "HX";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        dir = shape === "s" ? "BY" : "LY";
        rep = arro2[1];
      }
      break;
    case "NW":
      arro1 = findClosest(cx + w/2, cy - h/2, arros); // Find North arrow
      arro2 = findClosest(cx - w/2, cy + h/2, arros); // Find West arrow

      if (arro1 === undefined && arro2 === undefined)
        // Shoulders, waists, forearms or complex movements are ignored
        return undefined;
      // Caso de que haya flecha a ambos lados PENDIENTE
      if (arro1 != undefined && arro2 === undefined) {
        dir = shape === "s" ? "FX" : "HX";
        rep = arro1[1];
      } else if (arro2 != undefined && arro1 === undefined) {
        dir = shape === "s" ? "BY" : "LY";
        rep = arro2[1];
      }
      break;

    default:
      break;
  }


  return `(${dir}):${coda}`;
};

const fullArcs = (arc, arros) => {};

const arcToSignotation = (arc, arros) => {
  const shape = arc["tags"]["SHAPE"];

  if (shape[1] === "q" || shape[1] == "h") {
    // Traduction for quarter and half arcs is the same
    incompleteArcs();
  } else {
    fullArcs();
  }
};

export default arcToSignotation;
