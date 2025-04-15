import { useState } from "react";

const Signotation = ({ signotation, isLoading, dispatch}) => {

  const [selected, setSelected] = useState(null);

  return (
    <>
      {signotation && !isLoading && (
        <div className="flex flex-col items-center justify-center gap-4 mt-10 md:mt-0 md:row-start-1 md:row-end-1 md:col-start-1 md:col-end-3">
          <h1 className="signotacion text-[#4682A9] font-bold text-2xl">
            SIGNOTACIÓN
          </h1>
          <div className="flex flex-row items-center flex-wrap">
            {signotation.map((_, i) =>
              signotation[i].length > 0 &&
              signotation[i].map((_, j) => (
                <div className="flex items-center" key={`${i}-${j}`}>
                  <ButtonSignotation selected={selected} setSelected={setSelected} dispatch={dispatch} signotationText={signotation[i][j].signotation} i={i} j={j}/>
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

const ButtonSignotation = ({ selected, setSelected, signotationText, i, j, dispatch}) => {

  const handleClick = () => {
    if(selected && selected.i == i && selected.j == j){
      setSelected(null);
      dispatch({ type: "unselect_signotation"});
    }
    else{
      setSelected({ i: i, j: j });
      dispatch({ type: "select_signotation", i: i, j: j });
    }
  };

  return (
    <button onClick={handleClick} className={`${selected && selected.i == i && selected.j == j ? "bg-[#4682A9]" : "hover:bg-[#91bbd6]"} group rounded-xl overflow-hidden cursor-pointer mx-1 px-4 py-2`}>
      <h1 className={`${selected && selected.i == i && selected.j == j ? "brightness-0 invert scale-110" : "group-hover:scale-110"}  text-[#4682A9] font-bold text-xl`}>
        {signotationText}
      </h1>
    </button>
  );
};

export default Signotation;