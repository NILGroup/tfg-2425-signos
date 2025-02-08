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

const findClosestArro = (x, y, arrows) => {
  let minDist = Number.MAX_SAFE_INTEGER;
  let closestArro = undefined;
  let closestArroIdx = -1;

  arrows.forEach((arro, index) => {
    // Podria comprobarse si la rotacion coincide
    if (!arro["paired"]) {
      let dist = distanceTo(x, y, arro["box"][0], arro["box"][1]);
      if (dist < minDist && dist < Math.max(arro["box"][2], arro["box"][3])) {
        minDist = dist;
        closestArro = arro;
        closestArroIdx = index;
      }
    }
  });

  if (closestArro === undefined) return undefined;

  arrows[closestArroIdx]["paired"] = true;

  return closestArro;
};

export const findClosest = (x, y, arrows) => {
  // Find the closest arrow
  const closestArro = findClosestArro(x, y, arrows);

  if (closestArro === undefined) return undefined;

  // In case of double arrow
  const doubleArro = findClosestArro(
    closestArro["box"][0],
    closestArro["box"][1],
    arrows
  );

  return doubleArro === undefined ||
    closestArro["tags"]["SHAPE"] != doubleArro["tags"]["SHAPE"]
    ? [closestArro["tags"]["SHAPE"], false]
    : [closestArro["tags"]["SHAPE"], true];
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
