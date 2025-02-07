import distanceTo from "./distance";

export const findMyArro = (x, y, rotations, graphemes) => {
  let minDist = 1;
  let rotNearestArro = undefined;
  graphemes.forEach((grapheme) => {
    if (
      grapheme["tags"]["CLASS"] === "ARRO" &&
      rotations.includes(grapheme["tags"]["ROT"])
    ) {
      let dist = distanceTo(x, y, grapheme["box"][0], grapheme["box"][1]);
      if (dist < minDist) {
        minDist = dist;
        rotNearestArro = grapheme["tags"]["ROT"];
      }
    }
  });

  return rotNearestArro;
};

export const findClosest = (x, y, graphemes, rot) => {
  let minDist = 1;

  graphemes.forEach((grapheme) => {
    if (grapheme["tags"]["CLASS"] === "ARRO" && grapheme["tags"]["ROT"] === rot) {
      let dist = distanceTo(x, y, grapheme["box"][0], grapheme["box"][1]);
      if (dist < minDist) {
        minDist = dist;
      }
    }
  });
};

export const arroToSignotation = (arro) => {
  const rot = arro["ROT"];

  switch (rot) {
    case "N":
      return "H";
    case "NE":
      return "HY";
    case "E":
      return "Y";
    case "SE":
      return "LY";
    case "NW":
      return "HX";
    case "W":
      return "X";
    case "SW":
      return "LX";
    case "S":
      return "L";
  }
};
