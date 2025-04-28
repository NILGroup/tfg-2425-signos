
const diacToSignotation = (diac, diacsInfo) => {
    const diac_shape = {
      touch: "*",
      inter: "*",
      brush: "*", //( : * : * )
      grasp: "*",
      between: "*",
      rub: "*", //significa contacto en las tres partes ( * : * : * )
      flex_hook: "^", //mov interno de la mano - garra dedos
      flex_base: "7",
      flex_alt: "7w",
      ext_hook: "<", //mov interno de la mano - extender dedo (ej tatata)
      ext_base: "<",
      ext_alt: "<w",
      strike: "*", //( : * : )
      tense: "!",
      wiggle: "w",
      sym: "=",
      altern: "~",
    };

    if(diac["grapheme"]["SHAPE"] in diac_shape){
      if(!(diac_shape[diac["grapheme"]["SHAPE"]] in diacsInfo)){
        diacsInfo[diac_shape[diac["grapheme"]["SHAPE"]]] = {"numApps": 1, "signotation": diac_shape[diac["grapheme"]["SHAPE"]], 
                                                "explanation": [diac["explanation"]["text"]]};    

      } else {
        diacsInfo[diac_shape[diac["grapheme"]["SHAPE"]]]["numApps"]++;
      }
    }
};

export default diacToSignotation;
  