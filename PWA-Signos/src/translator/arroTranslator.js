import distanceTo from "./distance";

const findClosestArro = (x, y, arrows, margin) => {
  let minDist = Number.MAX_SAFE_INTEGER;
  let closestArro = undefined;
  let closestArroIdx = -1;

  arrows.forEach((arro, index) => {
    if (!arro["paired"]) {
      let dist = distanceTo(x, y, arro["box"][0], arro["box"][1]);
      if (dist < minDist)
      // Stems and half arcs
      if (margin===undefined && dist < Math.max(arro["box"][2], arro["box"][3])) {
        minDist = dist;
        closestArro = arro;
        closestArroIdx = index;
      }
      else if (dist < margin) { // Circular arrows
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

export const findClosest = (x, y, arrows, margin=undefined) => {
  // Find the closest arrow
  const closestArro = findClosestArro(x, y, arrows, margin);

  if (closestArro === undefined) return undefined;

  // In case of double arrow
  const doubleArro = findClosestArro(
    closestArro["box"][0],
    closestArro["box"][1],
    arrows,
    margin
  );

  return doubleArro === undefined ||
    closestArro["tags"]["SHAPE"] != doubleArro["tags"]["SHAPE"]
    ? [closestArro["tags"], false]
    : [closestArro["tags"], true];
};

