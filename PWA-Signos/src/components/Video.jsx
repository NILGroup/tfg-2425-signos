import React from "react";


const Video = ({ index, info, updateSelected, selectedVideo }) => {
    const isSelected = selectedVideo === index;
    const className = isSelected ? 'selected-video-container' : 'video-container flex flex-row';

    return (
        <div onClick={() => updateSelected(index)} className={`flex flex-row ${
            isSelected ? "bg-gray-300" : ''
        }`}>
            <video className='h-30' autoPlay={isSelected} controls={isSelected}>
                <source src={info.video} type="video/mp4" />
            </video>
            <div className='flex flex-col gap-1 justify-center w-full'>
                <h1 className='font-bold text-[#4682A9] text-lg'>{info.gloss}</h1>
                <p className='text-xl text-[#4682A9] font-bold text-base'>{info.notation}</p>
            </div>
        </div>
    );
};


export default Video;