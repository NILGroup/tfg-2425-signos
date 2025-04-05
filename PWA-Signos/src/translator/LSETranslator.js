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
                    rep = stem["tags"]["EXTRA"] === "R" ? ":R" : ":N";
                    
			});
			graphemes["ARC"].forEach((arc) => {
				signotation += ":" + arc["tags"]["SIGNOTATION"];
                if (arc["tags"]["EXTRA"] !== undefined)
                    rep = arc["tags"]["EXTRA"] === "R" ? ":R" : ":N";
			});

            if (rep !== undefined) {
                signotation += rep; 
            }
            break;
        case 2: // There are 2 hands
            break;
        default: // No hands
            break;
    }

    return signotation;
};

const createSignotation = (graphemes, diacsInfo) => {
    let handSignotation = undefined;
    let headSignotation = undefined;
    let diacSignotation = [];
    let stemSignotation = [];
    let arcSignotation = [];
    let repSignotation = [];

    switch (graphemes["HAND"].length) {
        case 1: // There is only 1 hand
            // Hand signotation
            handSignotation = graphemes["HAND"][0]["tags"]["SIGNOTATION"];

            // Head signotation
            headSignotation =
                (graphemes["HEAD"].length == 0 || graphemes["HEAD"][0]["tags"]["SIGNOTATION"] === undefined)
                    ? undefined
                    : graphemes["HEAD"][0]["tags"]["SIGNOTATION"];
            
            // Diac signotation
            let numDiac = 0;
            for(let diac in diacsInfo){
                if(diacsInfo[diac]["numApps"] > 1){
                    repSignotation[0] = 'R';
                }
                diacSignotation[numDiac] = diacsInfo[diac]["signotation"];
                numDiac++;
            }

            // Stem signotation
            let numStem = 0;
			graphemes["STEM"].forEach((stem) => {
				stemSignotation[numStem] = stem["tags"]["SIGNOTATION"];
                if (stem["tags"]["EXTRA"] !== undefined && stem["tags"]["EXTRA"] === 'R')
                    repSignotation[0] = 'R';
                else if (stem["tags"]["EXTRA"] !== undefined && stem["tags"]["EXTRA"] === 'N')
                    repSignotation[1] = 'N';
                numStem++;
			});

            // Arc signotation
            let numArc = 0;
			graphemes["ARC"].forEach((arc) => {
				arcSignotation[numArc] = arc["tags"]["SIGNOTATION"];
                if (arc["tags"]["EXTRA"] !== undefined && arc["tags"]["EXTRA"] === 'R')
                    repSignotation[0] = 'R';
                else if (arc["tags"]["EXTRA"] !== undefined && arc["tags"]["EXTRA"] === 'N')
                    repSignotation[1] = 'N';
                numArc++;
			});
            break;
        case 2: // There are 2 hands
            break;
        default: // No hands
            break;
    }
    return [handSignotation, headSignotation, diacSignotation, stemSignotation, arcSignotation, repSignotation];
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

	//let r = groupSignotation(graphemes, diacsInfo);
    let r = createSignotation(graphemes, diacsInfo);
    console.log('signotacion creada: ' + r);
    return r;
};

export default responseToSignotation;
