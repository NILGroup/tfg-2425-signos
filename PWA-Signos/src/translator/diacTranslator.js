
const diacToSignotation = (diac) => {
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

    diac["SIGNOTATION"] = diac_shape[diac["SHAPE"]];
};

export default diacToSignotation;
  