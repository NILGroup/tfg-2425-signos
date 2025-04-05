import { useState } from 'react'
import backIcon from '../assets/back.svg'
import profesorSign from '../examples/profesor.png'
import alicanteSign from '../examples/alicante.png'
import narizSign from '../examples/nariz.png'
import hartoSign from '../examples/harto.png'
import importaSign from '../examples/atiqueteimporta.png'


const Example = ({index, url, wordSign, dispatch}) => {

    async function exampleSelected() {
        const res = await fetch(url);
        const blob = await res.blob();
        dispatch({type: 'example_selected', file: new File([blob], wordSign, { type: blob.type }), image: url, imageName: wordSign});
    };

    return (<button onClick={exampleSelected} className="flex flex-col justify-center items-center gap-5 m-5"> 
        <img className="h-75 w-110 border-4 rounded-xl border-[#4682A9] border-solid" src={url} alt="Wordsign"/> 
        <p className="text-[#4682A9] font-bold text-lg"> {wordSign} </p> 
    </button>);
};

const Examples = ({dispatch}) => {

    const handleBack = () => {
        dispatch({type: "hide_examples"})
    };

    const examples = [[profesorSign, "Profesor"], [alicanteSign, "Alicante"], [narizSign, "Nariz"],
                        [hartoSign, "Harto"], [importaSign, "A ti qué te importa"]];

    return (
        <div>
            <div className="flex flex-row items-center">
                <button onClick={handleBack} className="group border-[#4682A9] border-6 hover:bg-[#4682A9] rounded-full w-18 h-18 cursor-pointer ml-25">
                    <img src={backIcon} alt="Go back Icon" className="group-hover:brightness-0 group-hover:invert h-13 w-14"/>
                </button>
                <h1 className="text-center text-[#4682A9] font-bold text-3xl ml-180">Ejemplos</h1>
            </div>
            <div className="grid grid-cols-3">
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

export default Examples;