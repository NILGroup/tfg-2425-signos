import handToSignotation from './handTranslator';
import headToSignotation from './headTranslator';
import diacToSignotation from './diacTranslator';
import arroToSignotation from './arroTranslator';
import stemToSignotation from './stemTranslator';
import arcToSignotation from './arcTranslator';

  const responseToSignotation = (response) => {
    let signotation = "";
    let head = "";
    let diac = [];
    let hand = [];
    let arro = [];
    let stem = [];
    let arc = [];
    response["graphemes"].forEach((grapheme) => {
      switch (grapheme["tags"]["CLASS"]) {
        case "HEAD":
          head += headToSignotation(grapheme["tags"]);
          break;
        case "DIAC":
          diac += diacToSignotation(grapheme["tags"]);
          break;
        case "HAND":
          hand += handToSignotation(grapheme["tags"]);
          break;
        case "ARRO":
          arro += arroToSignotation(grapheme["tags"]);
          break;
        case "STEM":
          stem += stemToSignotation(grapheme, response["graphemes"]);
          break;
        case "ARC":
          arc = arcToSignotation(grapheme, response["graphemes"]); // Revisar si se le puede pasar otra cosa
          break;
        default:
          break;
      }
    });
    return hand;
  };

export default responseToSignotation;