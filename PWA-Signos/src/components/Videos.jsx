import React from "react";
import { useRef } from "react";

const Videos = ({videos, isLoading}) => {
  
    return (<>{videos && !isLoading && (
      <div className='flex items-center justify-center md:row-start-2 md:row-end-4 md:col-start-2 md:col-end-3 '>
          <div className="border-4 border-[#4682A9] rounded-xl md:mr-8 md:max-w-250 md:max-h-180 flex flex-col overflow-y-scroll h-full 
                  [&::-webkit-scrollbar]:w-1.5
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-neutral-700
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {videos.map((_, index) => (
              <Video 
                key={index}
                index={index}
                lastIndex={videos.length - 1}
                info={videos[index]}
              />
            ))}
          </div>
          </div>
      )}
      </>)
}

const Video = ({ index, lastIndex, info}) => {
    const video = useRef(null);

    const play = () => video.current.play();
    const stop = () => {video.current.pause();
                        video.current.currentTime=0;};

    return (
        <div onMouseEnter={play} onMouseLeave={stop}
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

export default Videos;