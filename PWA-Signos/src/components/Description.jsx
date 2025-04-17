const Description = ({selectedSignotation, signotation}) => {

  const applyStyle = (text) => {

    return text.replace(/\*([^*]*)\*/g,
        "<strong>$1</strong>");
}

  return (
    <>
      {selectedSignotation != null &&
        <div className="border-solid border-[#4682A9] mx-4 max-w-full">
          <p className="signotacion text-[#4682A9] text-lg md:text-xl text-wrap" dangerouslySetInnerHTML={{__html: applyStyle(signotation[selectedSignotation.i][selectedSignotation.j].description) }} >
          </p>
        </div>
      }
    </>
  );
};

export default Description;