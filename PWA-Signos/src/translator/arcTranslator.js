import {findMyArro} from './arroTranslator.js'

const arcToSignotation = (arc, graphemes) => {
  const shape = arc["tags"]["SHAPE"];
  const rot = arc["tags"]["ROT"];
  let arroRot = undefined;

  if (shape[1] === "f") {
    // El movimiento es un circulo completo
    switch (rot) {
      case "N":
        arroRot = findMyArro(
          arc["box"][0],
          arc["box"][1],
          ["SE", "E", "W", "SW"],
          graphemes
        );
        if (shape[0] === "s") return arroRot === "W" ? "(B,X)" : "(B,Y)";

        return arroRot === "W" ? "(L,X)" : "(L,Y)";
      case "NE":
        arroRot = findMyArro(
          arc["box"][0],
          arc["box"][1],
          ["W", "NW", "S", "SE"],
          graphemes
        );
        if (shape[0] === "s") return arroRot === "NW" ? "(B,X)" : "(B,Y)";

        return arroRot === "NW" ? "(L,X)" : "(L,Y)";
      case "E":
        arroRot = findMyArro(
          arc["box"][0],
          arc["box"][1],
          ["N", "NW", "S", "SW"],
          graphemes
        );
        if (shape[0] === "s") return arroRot === "N" ? "(X,F)" : "(X,B)";

        return arroRot === "N" ? "(X,H)" : "(X,L)";
      case "SE":
        arroRot = findMyArro(
          arc["box"][0],
          arc["box"][1],
          ["N", "NE", "SW", "W"],
          graphemes
        );
        if (shape[0] === "s") return arroRot === "NE" ? "(F,Y)" : "(F,Y)";

        return arroRot === "NE" ? "(H,Y)" : "(H,X)";
      case "NW":
        arroRot = findMyArro(
          arc["box"][0],
          arc["box"][1],
          ["NE", "SW"],
          graphemes
        );
        if (shape[0] === "s") return arroRot === "W" ? "(B,X)" : "(B,Y)";

        return arroRot === "W" ? "(L,X)" : "(L,Y)";
      case "W":
        arroRot = findMyArro(
          arc["box"][0],
          arc["box"][1],
          ["N", "S"],
          graphemes
        );
        if (shape[0] === "s") return arroRot === "W" ? "(Y,B)" : "(Y,F)";

        return arroRot === "W" ? "(Y,L)" : "(Y,H)";
      case "SW":
        arroRot = findMyArro(
          arc["box"][0],
          arc["box"][1],
          ["NW", "SE"],
          graphemes
        );
        if (shape[0] === "s") return arroRot === "W" ? "(F,Y)" : "(F,X)";

        return arroRot === "W" ? "(H,Y)" : "(H,X)";
      case "S":
        arroRot = findMyArro(
          arc["box"][0],
          arc["box"][1],
          ["W", "E"],
          graphemes
        );
        if (shape[0] === "s") return arroRot === "W" ? "(F,Y)" : "(F,X)";

        return arroRot === "W" ? "(H,Y)" : "(H,X)";
      default:
        break;
    }
  }
};

export default arcToSignotation;
