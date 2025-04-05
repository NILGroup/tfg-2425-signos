import React from "react";
import { useRef } from "react";

const Videos = ({videos, isLoading}) => {
  
    return (<>{videos && !isLoading && (
      <div className='flex items-center justify-center my-3 md:mt-0 md:row-start-2 md:row-end-4 md:col-start-2 md:col-end-3 '>
          <div className="flex flex-col overflow-y-scroll h-full mx-4 md:mx-0 max-w-90 md:max-w-250 max-h-100 md:max-h-180 border-4 border-[#4682A9] rounded-xl md:mr-8   
                  md:[&::-webkit-scrollbar]:w-1.5
                  md:[&::-webkit-scrollbar-track]:rounded-full
                  md:[&::-webkit-scrollbar-track]:bg-neutral-700
                  md:[&::-webkit-scrollbar-thumb]:rounded-full
                  md:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
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
        className={`flex flex-col md:flex-row
                    ${index !== lastIndex ? "border-solid border-b-4 border-[#4682A9]" : ""}`}>
            
            <video className='max-h-[200px] max-w-[350px] m-2' loop
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