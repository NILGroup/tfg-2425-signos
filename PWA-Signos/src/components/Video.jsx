import React from "react";


const Video = ({info}) => {

    return (
        <div className="video">
            <video width="320" height="240" controls>
                <source src={info['video']} type="video/mp4"></source>
            </video>
            <h1>{info['gloss']}</h1>
            <h2>{info['notation']}</h2>
        </div>
    );
}

export default Video;