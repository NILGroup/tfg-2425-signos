import handToSignotation from "./handTranslator";
import headToSignotation from "./headTranslator";
import diacToSignotation from "./diacTranslator";
import stemToSignotation from "./stemTranslator";
import arcToSignotation from "./arcTranslator";

const classifyGraphemes = (response, graphemes) => {
    response["raw_tags"].forEach((grapheme, index) => {
        switch (grapheme["CLASS"]) {
            case "HEAD":
                graphemes["HEAD"].push({grapheme: grapheme, explanation: response["explanations"][index]});
                break;
            case "DIAC":
                graphemes["DIAC"].push({grapheme: grapheme, explanation: response["explanations"][index]});
                break;
            case "HAND":
                graphemes["HAND"].push({grapheme: grapheme, explanation: response["explanations"][index]});
                break;
            case "ARRO":
                grapheme["paired"] = false;
                graphemes["ARRO"].push({grapheme: grapheme, explanation: response["explanations"][index]});
                break;
            case "STEM":
                graphemes["STEM"].push({grapheme: grapheme, explanation: response["explanations"][index]});
                break;
            case "ARC":
                graphemes["ARC"].push({grapheme: grapheme, explanation: response["explanations"][index]});
                break;
            default:
                break;
        }
    });
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
        case 0: // No hands
            // Head signotation
            if(graphemes["HEAD"].length > 0 && graphemes["HEAD"][0]["signotation"] !== undefined){
                headSignotation.push({signotation: graphemes["HEAD"][0]["signotation"], description: graphemes["HEAD"][0]["explanation"]["text"]});
                signotation.push(headSignotation);
            }
                
            break;
        case 1: // There is only 1 hand
            // Hand signotation
            handSignotation.push({signotation: graphemes["HAND"][0]["signotation"], description: graphemes["HAND"][0]["explanation"]["text"]});
            signotation.push(handSignotation);

            // Head signotation
            if(graphemes["HEAD"].length > 0 && graphemes["HEAD"][0]["signotation"] !== undefined){
                headSignotation.push({signotation: graphemes["HEAD"][0]["signotation"], description: graphemes["HEAD"][0]["explanation"]["text"]});
                signotation.push(headSignotation);
            }
                
            
            // Diac signotation
            for(let diac in diacsInfo){
                if(diacsInfo[diac]["numApps"] > 1)
                    repRandN[0] = true;
                diacSignotation.push({signotation: diacsInfo[diac]["signotation"], description: diacsInfo[diac]["description"]});
            }
            if(diacSignotation.length > 0)
                signotation.push(diacSignotation);

            
            // Stem signotation
			graphemes["STEM"].forEach((stem) => {
                if (stem["signotation"] !== undefined){
                    stemSignotation.push({signotation: stem["signotation"], description: stem["explanation"]["text"]});
                    if (stem["extra"] !== undefined && stem["extra"] === 'R')
                        repRandN[0] = true;
                    else if (stem["extra"] !== undefined && stem["extra"] === 'N')
                        repRandN[1] = true;
                }		
			});
            if(stemSignotation.length > 0)
                signotation.push(stemSignotation);

            // Arc signotation
			graphemes["ARC"].forEach((arc) => {
				arcSignotation.push(arc["signotation"]);
                if (arc["extra"] !== undefined && arc["extra"] === 'R')
                    repRandN[0] = true;
                else if (arc["extra"] !== undefined && arc["extra"] === 'N')
                    repRandN[1] = true;
			});
            if(arcSignotation.length > 0)
                signotation.push(arcSignotation);

            if(repRandN[0]) {
                repSignotation.push({signotation: 'R', description: 'La *R* indica repetición'});
            }
            if(repRandN[1]) {
                repSignotation.push({signotation:'N', description: 'La *N* indica vaivén en un movimiento'});
            }
            if(repSignotation.length > 0)
                signotation.push(repSignotation);
            break;
        case 2: // There are 2 hands
            break;
        default: // No hands
            throw new Error("Se ha identificado más de una mano en la imagen.");
    }
    let signotationStr = "";
    signotation.forEach((part) => {
        part.forEach((grapheme) => {
           signotationStr += grapheme["signotation"] + ":";
        });
    });
    signotationStr = signotationStr.slice(0, -1); // Remove the last ":"
    return [signotation, signotationStr];
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
    try {
        classifyGraphemes(response, graphemes);

        console.log(graphemes);
        graphemes["HAND"].forEach((grapheme) => {
        handToSignotation(grapheme);
        });
    
        graphemes["HEAD"].forEach((grapheme) => {
                headToSignotation(grapheme);
            });

        graphemes["DIAC"].forEach((grapheme) => {
            diacToSignotation(grapheme, diacsInfo);
        });

        graphemes["STEM"].forEach((grapheme) => {
            stemToSignotation(grapheme, graphemes["ARRO"]);
        });

        graphemes["ARC"].forEach((grapheme) => {
            arcToSignotation(grapheme, graphemes["ARRO"]);
        });
        
    } catch (error) {
        throw new Error("¡Lo sentimos! No se ha podido traducir la imagen");
    }

    let r = createSignotation(graphemes, diacsInfo);
    console.log(r);
    return r;
};

export default responseToSignotation;
