import { useState } from 'react'
import alumnoSign from '../examples/64.png'
import narizSign from '../examples/201.png'

const Example = ({index, url, wordSign}) => {
    return (<div className="flex flex-col gap-1"> 
        <img className="h-75 w-200 border-4 rounded-xl border-[#4682A9] border-solid" src={url} alt="Wordsign"/> 
        <p className="text-[#4682A9] font-bold text-lg"> {wordSign} </p> 
    </div>);
};

const Examples = () => {
    const [selectedExample, setSelectedExample] = useState(null);

    const examples = [[alumnoSign, "Alumno"], [narizSign, "Nariz"]];

    return (
        <div>
            <h1 className="text-[#4682A9] font-bold text-3xl">Ejemplos</h1>
            <div className="grid grid-cols-4 m-5 gap-4 ">
                {examples.map((_, index) => (
                    <Example 
                    key={index}
                    index={index}
                    url = {examples[index][0]}
                    wordSign = {examples[index][1]}
                    />
                ))}
            </div>
        </div>
    );
};

export default Examples;