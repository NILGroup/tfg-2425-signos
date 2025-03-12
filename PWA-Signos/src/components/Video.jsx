import React from "react";
import { useRef } from "react";


const Video = ({ index, lastIndex, info, updateSelected, selectedVideo }) => {
    const isSelected = selectedVideo === index;
    const video = useRef(null);

    const play = () => video.current.play();
    const stop = () => {video.current.pause();
                        video.current.currentTime=0;};

    return (
        <div onClick={() => updateSelected(index)} onMouseEnter={play} onMouseLeave={stop}
        className={`flex flex-row
                    ${index !== lastIndex ? "border-solid border-b-4 border-[#4682A9]" : ""}`}>
            
            <video className='h-[200px] w-[350px] m-2' loop
                                                     ref={video} >   
                <source src={info.video} type="video/mp4" />
            </video>
            <div className='flex flex-col justify-center w-full'>
                <h1 className='text-[#4682A9] text-lg'>{info.gloss}</h1>
                <p className='text-xl text-[#4682A9] font-bold text-base'>{info.notation}</p>
            </div>
        </div>
    );
};


export default Video;