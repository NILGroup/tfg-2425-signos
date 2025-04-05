import React from "react";

const Signotation = ({ signotation, isLoading }) => {
  return (
    <>
      {signotation && !isLoading && (
        <div className="flex flex-col gap-4 mt-10">
          <h1 className="signotacion text-[#4682A9] font-bold text-2xl">
            SIGNOTACIÓN
          </h1>
          <div className="flex flex-row items-center flex-wrap">
            {signotation.map((_, i) =>
              signotation[i].length > 0 &&
              signotation[i].map((_, j) => (
                <div className="flex items-center" key={`${i}-${j}`}>
                  <ButtonSignotation signotationText={signotation[i][j]} />
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

const ButtonSignotation = ({ signotationText }) => {
  return (
    <button className="group rounded-xl overflow-hidden hover:bg-[#4682A9] cursor-pointer mx-1 px-4 py-2">
      <h1 className="group-hover:brightness-0 group-hover:invert group-hover:scale-110 text-[#4682A9] font-bold text-xl">
        {signotationText}
      </h1>
    </button>
  );
};

export default Signotation;