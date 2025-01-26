import React from "react";


const Video = ({index, info, updateSelected, selectedVideo}) => {
    const isSelected = selectedVideo === index ? true : false
    const className = isSelected ? 'selected-video' : 'video'

    const handleClick = () => {
        updateSelected(index)
    }

    if (isSelected){
        return (
            <div onClick={handleClick} className={className}>
                <video width="320" height="240" autoPlay controls >
                    <source src={info['video']} type="video/mp4"></source>
                </video>
                <h1>{info['gloss']}</h1>
                <h2>{info['notation']}</h2>
            </div>
        );
    }

    return (
        <div onClick={handleClick} className={className}>
            <video width="320" height="240" loop="">
                <source src={info['video']} type="video/mp4"></source>
            </video>
            <h1>{info['gloss']}</h1>
            <h2>{info['notation']}</h2>
        </div>
    );
}

export default Video;