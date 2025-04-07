const Description = ({selectedSignotation, signotation}) => {

  return (
    <>
      {selectedSignotation != null &&
        <div className=" border-solid border-[#4682A9] max-w-full">
          <p className="signotacion text-[#4682A9] text-xl text-wrap">
            {signotation[selectedSignotation.i][selectedSignotation.j].description}
          </p>
        </div>
      }
    </>
  );
};

export default Description;