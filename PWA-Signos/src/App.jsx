import { useState, useReducer } from 'react'
import './App.css'
import SwitchMode from './components/SwitchMode.jsx'
import ImageMode from './components/ImageMode.jsx'
import Canvas from './components/Canvas.jsx'

const INITIAL_STATE = {
  screen: 'image_screen',
  isLoading: false,
  helpVisible: false,
  switcherVisible: true
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'canvas_mode':
      return { ...state, screen: 'canvas_screen' }
    case 'image_mode':
      return { ...state, screen: 'image_screen' }
    case 'select_image':
      return { ...state, isCanvasVisible: action.payload }
    case 'upload_image':
      return { ...state, isCanvasVisible: action.payload }
    case 'signario_response':
      return { ...state, isCanvasVisible: action.payload }
    case 'error_response':
      return { ...state, isCanvasVisible: action.payload }
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
    <>
      <Header />
      {state.switcherVisible && <SwitchMode isChecked={isCanvasVisible} changeMode={setIsCanvasVisible}/>}
      {screen}
    </>
  )
}

const Header = () => {
  return (
    <div className='mt-4 mb-4'>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center text-[#4682A9] font-bold"> Traduciendo la SignoEscritura </h1>
      <hr className="mx-2 mt-2.5  lg:mx-4 lg:mt-4 h-0.5 bg-[#91C8E4] rounded-full border-none"></hr>
    </div>
  )
}

export default App;
