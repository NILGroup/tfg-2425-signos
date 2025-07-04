import { useState } from "react";

const Signotation = ({ selectedSignotation, signotation, isLoading, dispatch}) => {

  const [selected, setSelected] = useState(null);

  return (
    <>
      {signotation && !isLoading && (
        <div className="flex flex-col items-center justify-center gap-2 mt-3 md:mt-3 md:row-start-1 md:row-end-1 md:col-start-1 md:col-end-3">
          <h1 className="signotacion text-[#4682A9] font-bold text-xl md:text-2xl cursor-default">
            SIGNOTACIÓN
          </h1>
          <div className="flex flex-row items-center flex-wrap">
            {signotation.map((_, i) =>
              signotation[i].length > 0 &&
              signotation[i].map((_, j) => (
                <div className="flex items-center" key={`${i}-${j}`}>
                  <ButtonSignotation selectedSignotation={selectedSignotation} dispatch={dispatch} signotationText={signotation[i][j].signotation} i={i} j={j}/>
                  {(i != signotation.length - 1 || (i == signotation.length - 1 && j != signotation[i].length - 1)) && 
                    <span className="text-[#4682A9] font-bold">:</span>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

const ButtonSignotation = ({ selectedSignotation, signotationText, i, j, dispatch}) => {

  const handleClick = () => {
    if(selectedSignotation && selectedSignotation.i == i && selectedSignotation.j == j){
      dispatch({ type: "unselect_signotation"});
    }
    else{
      dispatch({ type: "select_signotation", i: i, j: j });
    }
  };

  return (
    <button onClick={handleClick} className={`${selectedSignotation && selectedSignotation.i == i && selectedSignotation.j == j ? "bg-[#4682A9]" : "hover:bg-[#91bbd6]"} group rounded-xl overflow-hidden cursor-pointer mx-1 px-4 py-2`}
            aria-label="Seleccionar este fragmento de signotación para ver su descripción" title={"Descripcion " + signotationText}>
      <h1 className={`${selectedSignotation && selectedSignotation.i == i && selectedSignotation.j == j ? "brightness-0 invert scale-110" : "group-hover:scale-110"}  text-[#4682A9] font-bold text-xl`}>
        {signotationText}
      </h1>
    </button>
  );
};

export default Signotation;