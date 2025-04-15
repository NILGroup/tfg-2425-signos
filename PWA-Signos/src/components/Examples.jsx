import backIcon from '../assets/back.svg'
import profesorSign from '../examples/profesor.png'
import alicanteSign from '../examples/alicante.png'
import narizSign from '../examples/nariz.png'
import hartoSign from '../examples/harto.png'
import importaSign from '../examples/atiqueteimporta.png'


const Examples = ({dispatch}) => {

    const examples = [[profesorSign, "Profesor"], [alicanteSign, "Alicante"], [narizSign, "Nariz"],
                        [hartoSign, "Harto"], [importaSign, "A ti qué te importa"]];

    return (
        <div flex flex-col>
            <div className="flex flex-row w-full mt-2 items-center gap-24">
                <BackButton dispatch={dispatch}/>
                <h1 className="text-center text-[#4682A9] font-bold text-2xl md:text-3xl">Ejemplos</h1>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-3">
                {examples.map((_, index) => (
                    <Example 
                    key={index}
                    index={index}
                    url = {examples[index][0]}
                    wordSign = {examples[index][1]}
                    dispatch = {dispatch}
                    />
                ))}
            </div>
        </div>
    );
};

const Example = ({index, url, wordSign, dispatch}) => {

    async function exampleSelected() {
        const res = await fetch(url);
        const blob = await res.blob();
        dispatch({type: 'example_selected', file: new File([blob], wordSign, { type: blob.type }), image: url, imageName: wordSign});
    };

    return (<button onClick={exampleSelected} className="flex flex-col justify-center items-center gap-5 m-5"> 
        <img className="h-75 w-110 border-4 rounded-xl border-[#4682A9] border-solid cursor-pointer" src={url} alt="Wordsign"/> 
        <p className="text-[#4682A9] font-bold text-lg"> {wordSign} </p> 
    </button>);
};

const BackButton = ({dispatch}) => {
    const handleBack = () => {
        dispatch({type: "hide_examples"})
    };
  
    return (
      <>
      {/*More info buttton*/}
      <button onClick={handleBack} className="group border-[#4682A9] border-3 md:border-6 hover:bg-[#4682A9] rounded-full w-10 h-10 md:w-20 md:h-20 ml-4 md:ml-0 cursor-pointer">
          <img src={backIcon} alt="More info Icon" className=" group-hover:brightness-0 group-hover:invert"/>
       </button>
      </> );
}

export default Examples;