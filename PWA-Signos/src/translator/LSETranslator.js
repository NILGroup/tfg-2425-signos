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
    let numAppearances = 0;

    switch (graphemes["HAND"].length) {
        case 1: // There is only 1 hand
            signotation += graphemes["HAND"][0]["tags"]["SIGNOTATION"];
            signotation +=
                (graphemes["HEAD"].length == 0 || graphemes["HEAD"][0]["tags"]["SIGNOTATION"] === undefined)
                    ? ""
                    : ":" + graphemes["HEAD"][0]["tags"]["SIGNOTATION"];
			graphemes["DIAC"].forEach((diac) => {
                if (numAppearances == 0 && diac["tags"]["SIGNOTATION"] === '*'){
                    numAppearances++;
                    signotation += ":" + diac["tags"]["SIGNOTATION"];
                }
                else if (numAppearances > 0 && diac["tags"]["SIGNOTATION"] === '*')
                    numAppearances++;
                else // All diacs that are not asterisks
                    signotation += ":" + diac["tags"]["SIGNOTATION"];
                
                
			});
			graphemes["STEM"].forEach((stem) => {
				signotation += ":" + stem["tags"]["SIGNOTATION"];
                if (stem["tags"]["REP"])
                    numAppearances = 2;
                    
			});
			graphemes["ARC"].forEach((arc) => {
				signotation += ":" + arc["tags"]["SIGNOTATION"];
                if (arc["tags"]["REP"])
                    numAppearances = 2;
			});

            if (numAppearances > 1)
                signotation += ":R"; 
            break;
        case 2: // There are 2 hands
            break;
        default: // No hands
            break;
    }

    return signotation;
};

const responseToSignotation = (response) => {
    let graphemes = {
        HEAD: [],
        HAND: [],
        DIAC: [],
        ARRO: [],
        STEM: [],
        ARC: [],
    };
    classifyGraphemes(response["graphemes"], graphemes);

    console.log(graphemes);
    graphemes["HEAD"].forEach((grapheme) => {
        headToSignotation(grapheme["tags"]);
    });

    graphemes["DIAC"].forEach((grapheme) => {
        diacToSignotation(grapheme["tags"]);
    });

    graphemes["HAND"].forEach((grapheme) => {
        handToSignotation(grapheme["tags"]);
    });

    graphemes["STEM"].forEach((grapheme) => {
        stemToSignotation(grapheme, graphemes["ARRO"]);
    });

    graphemes["ARC"].forEach((grapheme) => {
        arcToSignotation(grapheme, graphemes["ARRO"]);
    });

	let r = groupSignotation(graphemes);
	console.log(r);
    return r;
};

export default responseToSignotation;
