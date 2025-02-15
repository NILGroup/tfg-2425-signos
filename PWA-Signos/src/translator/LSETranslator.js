import handToSignotation from "./handTranslator";
import headToSignotation from "./headTranslator";
import diacToSignotation from "./diacTranslator";
import stemToSignotation from "./stemTranslator";
import arcToSignotation from "./arcTranslator";

const classifyGraphemes = (response, graphemes) => {
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

  let graphemes = { HEAD: [], HAND: [], DIAC: [], ARRO: [], STEM: [], ARC: [] };
  classifyGraphemes(response["graphemes"], graphemes);

  console.log(graphemes);
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
    stem.push(stemToSignotation(grapheme, graphemes["ARRO"]));
  });

  graphemes["ARC"].forEach((grapheme) => {
    arc += arcToSignotation(grapheme['tags'], graphemes["ARRO"]);
  });
  console.log(stem);
  return stem;
};

export default responseToSignotation;
