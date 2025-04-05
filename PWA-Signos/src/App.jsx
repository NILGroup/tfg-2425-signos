import { useReducer } from 'react'
import './App.css'
import SwitchMode from './components/SwitchMode.jsx'
import ImageMode from './components/ImageMode.jsx'
import Canvas from './components/Canvas.jsx'
import Examples from './components/Examples.jsx'

const INITIAL_STATE = {
  screen: 'image_screen',
  isLoading: false,
  helpVisible: false,
  switcherVisible: true,
  file: null,
  image: null,
  imageName: null,
  signotation: null,
  videos: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'canvas_mode':
      return { ...state, screen: 'canvas_screen' }
    case 'image_mode':
      return { ...state, screen: 'image_screen' }
    case 'select_image':
      if(state.image) {
        URL.revokeObjectURL(state.image);
        state.imageName = null;
        state.file = null;
      }
      return { ...state,  file: action.image, image: URL.createObjectURL(action.image), imageName: action.image.name, videos: null, signotation: null }
    case 'upload_image':
      return { ...state}
    case 'set_signotation':
      return { ...state, signotation: action.signotation }
    case 'signario_response':
      return { ...state, videos: action.videos}
    case 'error_response':
      return { ...state }
    case 'show_examples':
      return { ...state, screen: 'examples_screen', switcherVisible: false }
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

  // // Change mode between Upload images and Canvas
  // const [isCanvasVisible, setIsCanvasVisible] = useState(false)

  let screen;
  if(state.screen === 'image_screen'){
    screen = <ImageMode dispatch={dispatch} {...state}/>
  }
  else if(state.screen === 'canvas_screen'){
    screen = <Canvas dispatch={dispatch} {...state}/>
  }
  // else if(state.screen === 'examples_screen'){
  //   screen = <Examples/>
  // }

  return (
    <div className="flex flex-col min-h-full md:grid md:grid-cols-2 md:grid-rows-2 md:grid-rows-[70px_1fr] md:grid-cols-[70px_1fr]">
      <Header/>
        {state.switcherVisible && <SwitchMode dispatch={dispatch} screen={state.screen}/>}
        {screen}
    </div>
  )
}

const Header = () => {
  return (
    <div className='w-screen mt-2 mb-2 md:mb-0 md:mt-0 md:col-start-1 md:col-end-3'>
      <h1 className="text-xl md:text-2xl text-center text-[#4682A9] font-bold"> Traduciendo la SignoEscritura </h1>
      <hr className="mx-2 mt-1 md:mx-2.5 md:mt-1.5 h-0.5 bg-[#91C8E4] rounded-full border-none"></hr>
    </div>
  )
}

export default App;
