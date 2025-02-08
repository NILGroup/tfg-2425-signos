import handToSignotation from "./handTranslator";
import headToSignotation from "./headTranslator";
import diacToSignotation from "./diacTranslator";
import stemToSignotation from "./stemTranslator";
import arcToSignotation from "./arcTranslator";

const graphemes = { HEAD: [], HAND: [], DIAC: [], ARRO: [], STEM: [], ARC: [] };

const classifyGraphemes = (response) => {
  response.forEach((grapheme) => {
    switch (grapheme["tags"]["CLASS"]) {
      case "HEAD":
        graphemes["HEAD"].push(grapheme);
        break;
      case "DIAC":
        grapheme["paired"] = false;
        graphemes["DIAC"].push(grapheme);
        break;
      case "HAND":
        graphemes["HAND"].push(grapheme);
        break;
      case "ARRO":
        grapheme["paired"] = false;
        graphemes["ARRO"].push(grapheme);
        break;
      case "STEM":
        graphemes["STEM"].push(grapheme);
        break;
      case "ARC":
        graphemes["ARC"].push(grapheme);
        break;
      default:
        break;
    }
  });
};

const responseToSignotation = (response) => {
  let signotation = "";
  let head = "";
  let diac = [];
  let hand = [];
  let arro = [];
  let stem = [];
  let arc = [];

  classifyGraphemes(response["graphemes"]);

  graphemes["HEAD"].forEach((grapheme) => {
    head += headToSignotation(grapheme['tags']);
  });

  graphemes["DIAC"].forEach((grapheme) => {
    diac += diacToSignotation(grapheme['tags']);
  });

  graphemes["HAND"].forEach((grapheme) => {
    hand += handToSignotation(grapheme['tags']);
  });

  graphemes["STEM"].forEach((grapheme) => {
    stem += stemToSignotation(grapheme, grapheme["ARRO"]);
  });

  graphemes["ARC"].forEach((grapheme) => {
    arc += arcToSignotation(grapheme['tags'], grapheme["ARRO"]);
  });

  return hand;
};

export default responseToSignotation;
