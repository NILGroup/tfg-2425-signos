
const SwitchMode = ({ screen, dispatch }) => {
    const handleModeChange = () => {
        if (screen === "canvas_screen") 
          dispatch({ type: "image_mode" });
        else 
          dispatch({ type: "canvas_mode" });
    };

    return (
        <div className="mt-2 md:mt-0 mb-2 md:mb-0 md:ml-3 lg:ml-6 flex flex-row items-center justify-center md:w-fit md:flex md:flex-col md:items-center md:justify-center">
            <button
                onClick={handleModeChange}
                className={`border-3 md:border-4 max-md:rounded-l-xl md:rounded-t-xl border-[#4682A9] border-solid px-1 py-1 lg:px-2 py-2 hover:cursor-pointer ${
                    screen === "image_screen" ? "bg-[#4682A9]" : "max-md:border-r-2 md:border-b-3"
                }`}
            >
                <svg
                    className="h-[28px] w-[28px] md:h-[32px] md:w-[32px] lg:h-[36px] lg:w-[36px]"
                    
                    viewBox="-0.5 -0.5 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            stroke={`${
                                screen === "image_screen"
                                    ? "#c5dbe6"
                                    : "#4682A9"
                            }`}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </g>
                </svg>
            </button>
            <button
                onClick={handleModeChange}
                className={`border-3 md:border-4 max-md:rounded-r-xl md:rounded-b-xl border-[#4682A9] border-solid px-1 py-1 lg:px-2 py-2 hover:cursor-pointer ${
                    screen === "canvas_screen" ? "bg-[#4682A9]" : "max-md:border-l-2 md:border-t-3"
                }`}
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                   className="h-[26px] w-[26px] md:h-[32px] md:w-[32px] lg:h-[36px] lg:w-[36px] pl-1">
                    

                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                            fill={`${
                                screen === "canvas_screen"
                                    ? "#c5dbe6"
                                    : "#4682A9"
                            }`}
                        />
                    </g>
                </svg>

            </button>
        </div>
    );
};

export default SwitchMode;
