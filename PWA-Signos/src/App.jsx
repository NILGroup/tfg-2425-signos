import { useReducer } from "react";
import "./App.css";
import SwitchMode from "./components/SwitchMode.jsx";
import ImageMode from "./components/ImageMode.jsx";
import CanvasMode from "./components/CanvasMode.jsx";
import Examples from "./components/Examples.jsx";

const INITIAL_STATE = {
    screen: "image_screen",
    isLoading: false,
    helpVisible: false,
    switcherVisible: true,
    file: null,
    image: null,
    imageName: null,
    signotation: null,
    selectedSignotation: null,
    videos: null,
    error: null,
};

const CANVAS_STATE = {
  screen: "canvas_screen",
  isLoading: false,
  helpVisible: false,
  switcherVisible: true,
  file: null,
  image: null,
  imageName: null,
  signotation: null,
  selectedSignotation: null,
  videos: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'canvas_mode':
      state = INITIAL_STATE;
      return { ...state, screen: 'canvas_screen', error: null  }
    case 'image_mode':
      state = INITIAL_STATE;
      return { ...state, screen: 'image_screen', error: null }
    case 'select_image':
      if(state.image) {
        URL.revokeObjectURL(state.image);
      }
      state = INITIAL_STATE;
      return { ...state,  file: action.image, image: URL.createObjectURL(action.image), imageName: action.image.name}
    case 'upload_image':
      return { ...state, error: null, selectedSignotation: null}
    case 'upload_canvas':
      if (state.image) {
        URL.revokeObjectURL(state.image);
      }
      state = CANVAS_STATE;
      return { ...state, file: action.file, image: URL.createObjectURL(action.file), imageName: action.file.name}
    case 'set_signotation':
      return { ...state, signotation: action.signotation, error: null}
    case 'select_signotation':
      return { ...state, selectedSignotation: {i: action.i, j: action.j} }
    case 'unselect_signotation':
      return { ...state, selectedSignotation: null }
    case 'signario_response':
      return { ...state, videos: action.videos}
    case 'error_response':
      return { ...state, error: action.error}
    case 'show_examples':
      return { ...state, screen: 'examples_screen', switcherVisible: false }
    case 'example_selected':
      if (state.image) {
        URL.revokeObjectURL(state.image);
        state.imageName = null;
        state.file = null;
      }
      return { ...state, screen: 'image_screen', file: action.file, image: action.image, imageName: action.imageName, switcherVisible: true}
    case 'hide_examples':
      return { ...state, screen: 'image_screen', switcherVisible: true }
    case 'show_help':
      return { ...state, helpVisible: true }
    case 'hide_help':
      return { ...state, helpVisible: false }
    case 'set_loading':
      return { ...state, isLoading: true }
    case 'set_loaded':
      return { ...state, isLoading: false }
    default:
      return state
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  let screen;
  if(state.screen === 'image_screen'){
    screen = <ImageMode dispatch={dispatch} {...state}/>
  }
  else if(state.screen === 'canvas_screen'){
    screen = <CanvasMode dispatch={dispatch} {...state}/>
  }
  else if(state.screen === 'examples_screen'){
    screen = <Examples dispatch={dispatch}/>
  }

    return (
        <div className="flex flex-col min-h-full md:grid md:grid-cols-2 md:grid-rows-2 md:grid-rows-[auto_1fr] md:grid-cols-[auto_1fr]">
            <Header dispatch={dispatch} isLoading={state.isLoading}/>
            {state.switcherVisible && (
                <SwitchMode dispatch={dispatch} screen={state.screen} />
            )}
            {screen}

            {state.helpVisible && <HelpCard dispatch={dispatch} />}
        </div>
    );
}

const Header = ({dispatch, isLoading}) => {
    const handleClick = () => {
        if (isLoading) return;
        dispatch({ type: "image_mode" });
    }

    return (
        <div onClick={handleClick} className={`w-screen mt-2 lg:mt-4 mb-2 md:mb-0 md:col-start-1 md:col-end-3 ${isLoading ? "cursor-default" : "cursor-pointer"}`}>
            <h1 className="text-2xl lg:text-4xl lg:mb-4 text-center text-[#4682A9] font-bold">       
                TraduSE
            </h1>
            <hr className="mx-2 mt-1 md:mx-2.5 md:mt-1.5 md:mb-1 h-0.5 bg-[#91C8E4] rounded-full border-none"></hr>
        </div>
    );
};

const QuitButton = ({ dispatch }) => {
    const handleQuitButtonClick = () => {
        dispatch({ type: "hide_help" });
    };

    return (
        <>
            {/*More info buttton*/}
            <button
                onClick={handleQuitButtonClick}
                className="group border-[#4682A9] border-2 md:border-3 hover:bg-[#4682A9] rounded-full w-8 h-8 md:w-10 md:h-10 cursor-pointer"
                title="Cerrar ayuda"
                aria-label="Cerrar ayuda"
            >
                
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:brightness-0 group-hover:invert"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                            d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                            fill="#4682A9"
                        ></path>{" "}
                    </g>
                </svg>
            </button>
        </>
    );
};

const HelpCard = ({ dispatch }) => {

    const text = "Traduciendo la SignoEscritura es una herramienta para facilitar la interpretación de \
    la lengua de signos que permite al usuario obtener una representación visual de un signo \
    partiendo de su representación en SignoEscritura, ya sea por medio de una imagen o un \
    dibujo.";

    return (
        <div className="fixed inset-0 z-10 bg-black/30 flex justify-center items-center animate-fadeIn">
                <div className="relative rounded-xl flex flex-col gap-2 p-3 md:p-4 mx-3 md:mx-0 bg-[#c5dbe6] rounded-xl
                transition-all duration-300 ease-in-out transform animate-scaleIn md:max-w-[600px] lg:max-w-[900px]">
                  <QuitButton dispatch={dispatch} />
                  <div className="flex flex-col items-center gap-3 mx-2 md:mx-3 cursor-default">
                    <h1 className="text-center text-xl md:text-3xl text-center text-[#4682A9] font-bold">Traduciendo la Signoescritura</h1>
                    <p className="text-l md:text-xl text-[#4682A9] text-justify">{text}</p>      
                  </div>
                </div>
            </div>
    );
};

export default App;