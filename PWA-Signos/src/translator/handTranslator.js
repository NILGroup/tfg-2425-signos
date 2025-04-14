const handOrientation = (ori, rot, ref) => {
  let handOrientation = "";

  // Palm orientation
  if (ori === "b") {
    handOrientation += "F"; // Palm forward

    // Distal axis
    if (rot === "N" || rot === "NE" || rot === "NW") {
      handOrientation += "h";
    } else if (rot === "E") {
      handOrientation += "y";
    } else if (rot === "S" || rot === "SE" || rot === "SW") {
      handOrientation += "l";
    } else if (rot === "W") {
      handOrientation += "x";
    }
  } else if (ori === "w") {
    handOrientation += "B"; // Palm backwards

    // Distal axis
    if (rot === "N" || rot === "NE" || rot === "NW") {
      handOrientation += "h";
    } else if (rot === "E") {
      handOrientation += "y";
    } else if (rot === "S" || rot === "SE" || rot === "SW") {
      handOrientation += "l";
    } else if (rot === "W") {
      handOrientation += "x";
    }
  } else if (ori === "h") {
    if (ref === "n") handOrientation += "X"; // Palm left
    else handOrientation += "Y"; // Palm right

    // Distal axis
    if (rot === "N" || rot === "NE" || rot === "NW") {
      handOrientation += "h";
    } else if (rot === "S" || rot === "SE" || rot === "SW") {
      handOrientation += "l";
    } else {
      // No es posible
    }
  } else if (ori === "hb") {
    handOrientation += "L"; // Palm down

    // Distal axis
    if (rot === "N" || rot === "NE" || rot === "NW") {
      handOrientation += "f";
    } else if (rot === "E") {
      handOrientation += "y";
    } else if (rot === "S" || rot === "SE" || rot === "SW") {
      handOrientation += "b";
    } else if (rot === "W") {
      handOrientation += "x";
    }
  } else if (ori === "hw") {
    handOrientation += "H"; // Palm up

    // Distal axis
    if (rot === "N" || rot === "NE" || rot === "NW") {
      handOrientation += "f";
    } else if (rot === "E") {
      handOrientation += "y";
    } else if (rot === "S" || rot === "SE" || rot === "SW") {
      handOrientation += "b";
    } else if (rot === "W") {
      handOrientation += "x";
    }
  } else if (ori === "hh") {
    if (ref === "n") handOrientation += "X"; // Palm left
    else handOrientation += "Y"; // Palm right

    // Distal axis
    if (rot === "N" || rot === "NE" || rot === "NW") {
      handOrientation += "f";
    } else if (rot === "S" || rot === "SE" || rot === "SW") {
      handOrientation += "b";
    } else {
      // No es posible
    }
  }
  return handOrientation;
};

const handToSignotation = (hand) => {
  hand["signotation"] =
    hand["grapheme"]["SHAPE"] +
    ":" +
    handOrientation(hand["grapheme"]["VAR"], hand["grapheme"]["ROT"], hand["grapheme"]["REF"]);
};

export default handToSignotation;
