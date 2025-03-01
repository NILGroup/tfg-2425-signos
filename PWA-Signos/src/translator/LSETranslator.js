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
        grapheme["minDist"] = Number.MAX_SAFE_INTEGER;
        grapheme[""] = undefined;
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

const groupSignotation = (graphemes) => {
  let signotation = "";


  switch(graphemes["HAND"].length){
    case 1: // There is only 1 hand
      signotation += graphemes["HAND"]["SIGNOTATION"];
      break;
    case 2: // There are 2 hands
    
      break;
    default: // No hands
      break;
  }

  return signotation;
}


const responseToSignotation = (response) => {

  let graphemes = { HEAD: [], HAND: [], DIAC: [], ARRO: [], STEM: [], ARC: [] };
  classifyGraphemes(response["graphemes"], graphemes);

  console.log(graphemes);
  graphemes["HEAD"].forEach((grapheme) => {
    headToSignotation(grapheme['tags']);
  });

  graphemes["DIAC"].forEach((grapheme) => {
    diacToSignotation(grapheme['tags']);
  });

  graphemes["HAND"].forEach((grapheme) => {
    handToSignotation(grapheme['tags']);
  });

  graphemes["STEM"].forEach((grapheme) => {
    stemToSignotation(grapheme, graphemes["ARRO"]);
  });

  graphemes["ARC"].forEach((grapheme) => {
    arcToSignotation(grapheme, graphemes["ARRO"]);
  });

  return groupSignotation(graphemes);
};

export default responseToSignotation;
