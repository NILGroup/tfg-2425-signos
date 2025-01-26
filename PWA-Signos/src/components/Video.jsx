import React from "react";


const Video = ({index, info, updateSelected, selectedVideo}) => {
    const isSelected = selectedVideo === index ? true : false
    const className = isSelected ? 'selected-video-container' : 'video-container'

    const handleClick = () => {
        updateSelected(index)
    }

    if (isSelected){
        return (
            <div onClick={handleClick} className={className}>
                <video className="video" width="160" height="120" autoPlay controls >
                    <source src={info['video']} type="video/mp4"></source>
                </video>
                <h1>{info['gloss']}</h1>
                <h2>{info['notation']}</h2>
            </div>
        );
    }

    return (
        <div onClick={handleClick} className={className}>
            <video className="video" width="160" height="120">
                <source src={info['video']} type="video/mp4"></source>
            </video>
            <h1>{info['gloss']}</h1>
            <h2>{info['notation']}</h2>
        </div>
    );
}

export default Video;