
const headToSignotation = (head) => {
    const head_shape = {
      face: "Car",
      fore: "Cab",
      chin: "Bar",
      cheeks: "Mej",
      mouth: "Boc",
      moutho: "Boc",
      smile: "Boc",
      teeth: "Boc",
      tongue: "Boc",
      nose: "Nar",
      ears: "Ore",
      eyes: "Ojo",
      hair: "Cab",
      back: "CabB",
      neck: "Cue",
    };

    head["SIGNOTATION"] =  head_shape[head["SHAPE"]];
  };

export default headToSignotation;
  