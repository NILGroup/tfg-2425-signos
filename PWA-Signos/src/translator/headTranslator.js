
const headToSignotation = (head) => {
    const head_shape = {
      face: "Cab",
      fore: "Cab",
      forer: "CabY",
      forel: "CabX",
      chin: "Bar",
      cheeks: "Mej",
      cheekr: "MejY",
      cheekl: "MejX",
      mouth: "Boc",
      moutho: "Boc",
      smile: "Boc",
      teeth: "Boc",
      tongue: "Boc",
      nose: "Nar",
      ears: "Ore",
      earr: "OreY",
      earl: "OreX",
      eyes: "Ojo",
      eyer: "OjoY",
      eyel: "OjoX",
      hair: "Cab",
      back: "CabB",
      neck: "Cue",
    };
    
    head["signotation"] =  head_shape[head["grapheme"]["SHAPE"]];
  };

export default headToSignotation;
  