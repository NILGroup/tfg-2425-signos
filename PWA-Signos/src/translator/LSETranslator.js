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

const groupSignotation = (graphemes, diacsInfo) => {
    let signotation = "";
    let rep = undefined;

    switch (graphemes["HAND"].length) {
        case 1: // There is only 1 hand
            signotation += graphemes["HAND"][0]["tags"]["SIGNOTATION"];
            signotation +=
                (graphemes["HEAD"].length == 0 || graphemes["HEAD"][0]["tags"]["SIGNOTATION"] === undefined)
                    ? ""
                    : ":" + graphemes["HEAD"][0]["tags"]["SIGNOTATION"];

            for(let diac in diacsInfo){
                if(diacsInfo[diac]["numApps"] > 1){
                    rep = ':R';
                }
                signotation += ":" + diacsInfo[diac]["signotation"];
            }
			graphemes["STEM"].forEach((stem) => {
				signotation += ":" + stem["tags"]["SIGNOTATION"];
                if (stem["tags"]["EXTRA"] !== undefined)
                    rep = stem["tags"]["EXTRA"] === "R" ? "R" : "N";
                    
			});
			graphemes["ARC"].forEach((arc) => {
				signotation += ":" + arc["tags"]["SIGNOTATION"];
                if (arc["tags"]["EXTRA"] !== undefined)
                    rep = arc["tags"]["EXTRA"] === "R" ? "R" : "N";
			});

            if (rep !== undefined) {
                signotation += rep; 
            }
            break;
        default: // No hands
            throw new Error("¡Lo sentimos! No se ha podido traducir la imagen");
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

    const diacsInfo = {};
    try{

        classifyGraphemes(response["graphemes"], graphemes);

        console.log(graphemes);
        graphemes["HEAD"].forEach((grapheme) => {
            headToSignotation(grapheme["tags"]);
        });

        graphemes["DIAC"].forEach((grapheme) => {
            diacToSignotation(grapheme["tags"], diacsInfo);
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
    }
    catch (error) {
        throw new Error("¡Lo sentimos! No se ha podido traducir la imagen");
    }

	let r = groupSignotation(graphemes, diacsInfo);
	console.log(r);
    return r;
};

export default responseToSignotation;
