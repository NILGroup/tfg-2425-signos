import React from "react";

const Signotation = ({signotation, isLoading}) => {
    return (
    <>
    {signotation && !isLoading && <div className="flex flex-col gap-4 mt-10"> 
              <h1 className="signotacion text-[#4682A9] font-bold text-3xl"> SIGNOTACIÓN </h1> 
              {signotation.map((_, index) => (
                <button className="border-4 border-[#4682A9] rounded-xl w-250 h-127 overflow-hidden"> 
                    <h1 className="signotacion text-[#4682A9] font-bold text-xl"> {signotation[index]} </h1>
                </button>
              ))}
              </div> }
    </>
  )
}