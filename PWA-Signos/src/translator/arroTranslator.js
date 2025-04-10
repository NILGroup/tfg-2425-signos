import distanceTo from "./distance";

const findClosestArro = (x, y, arrows, margin) => {
  let minDist = Number.MAX_SAFE_INTEGER;
  let closestArro = undefined;
  let closestArroIdx = -1;

  arrows.forEach((arro, index) => {
    if (!arro["grapheme"]["paired"]) {
      let [cx, cy, h, w] = [arro["explanation"]["left"] + arro["explanation"]["width"] / 2, arro["explanation"]["top"] + arro["explanation"]["height"] / 2,
                            arro["explanation"]["height"], arro["explanation"]["width"]];
      let dist = distanceTo(x, y, cx, cy);
      // Stems and half arcs
      let d = 1.1*Math.max(h, w);
      if (margin===undefined && dist < d) {
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

  let [cx, cy] = [closestArro["explanation"]["left"] + closestArro["explanation"]["width"] / 2, closestArro["explanation"]["top"] + closestArro["explanation"]["height"] / 2];
  // In case of double arrow
  const doubleArro = findClosestArro(
    cx,
    cy,
    arrows,
    margin
  );

  return doubleArro === undefined ||
    closestArro["grapheme"]["SHAPE"] != doubleArro["grapheme"]["SHAPE"]
    ? [closestArro["grapheme"], false]
    : [closestArro["tags"], true];
};

