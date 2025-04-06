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
    let handSignotation = [];
    let headSignotation = [];
    let diacSignotation = [];
    let stemSignotation = [];
    let arcSignotation = [];
    let repRandN = [false, false];
    let repSignotation = [];

    let signotation = [];

    switch (graphemes["HAND"].length) {
        case 1: // There is only 1 hand
            // Hand signotation
            handSignotation.push(graphemes["HAND"][0]["tags"]["SIGNOTATION"]);
            signotation.push(handSignotation);

            // Head signotation
            if(graphemes["HEAD"].length > 0 && graphemes["HEAD"][0]["tags"]["SIGNOTATION"] !== undefined){
                headSignotation.push(graphemes["HEAD"][0]["tags"]["SIGNOTATION"]);
                signotation.push(headSignotation);
            }
                
            
            // Diac signotation
            for(let diac in diacsInfo){
                if(diacsInfo[diac]["numApps"] > 1)
                    repRandN[0] = true;
                diacSignotation.push(diacsInfo[diac]["signotation"]);
            }
            if(diacSignotation.length > 0)
                signotation.push(diacSignotation);

            
            // Stem signotation
			graphemes["STEM"].forEach((stem) => {
                if (stem["tags"]["SIGNOTATION"] !== undefined){
                    stemSignotation.push(stem["tags"]["SIGNOTATION"]);
                    if (stem["tags"]["EXTRA"] !== undefined && stem["tags"]["EXTRA"] === 'R')
                        repRandN[0] = true;
                    else if (stem["tags"]["EXTRA"] !== undefined && stem["tags"]["EXTRA"] === 'N')
                        repRandN[1] = true;
                }		
			});
            if(stemSignotation.length > 0)
                signotation.push(stemSignotation);

            // Arc signotation
			graphemes["ARC"].forEach((arc) => {
				arcSignotation.push(arc["tags"]["SIGNOTATION"]);
                if (arc["tags"]["EXTRA"] !== undefined && arc["tags"]["EXTRA"] === 'R')
                    repRandN[0] = true;
                else if (arc["tags"]["EXTRA"] !== undefined && arc["tags"]["EXTRA"] === 'N')
                    repRandN[1] = true;
			});
            if(arcSignotation.length > 0)
                signotation.push(arcSignotation);

            if(repRandN[0]) {
                repSignotation.push('R');
            }
            if(repRandN[1]) {
                repSignotation.push('N');
            }
            if(repSignotation.length > 0)
                signotation.push(repSignotation);
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

    const diacsInfo = {};

    classifyGraphemes(response, graphemes);

    console.log(graphemes);
    graphemes["HAND"].forEach((grapheme) => {
        handToSignotation(grapheme["tags"]);
    });
    
    graphemes["HEAD"].forEach((grapheme) => {
        headToSignotation(grapheme["tags"]);
    });

    graphemes["DIAC"].forEach((grapheme) => {
        diacToSignotation(grapheme["tags"], diacsInfo);
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
