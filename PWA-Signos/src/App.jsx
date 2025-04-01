import { useState} from 'react'
import './App.css'
import SwitchMode from './components/SwitchMode.jsx'
import ImageMode from './components/ImageMode.jsx'
import Canvas from './components/Canvas.jsx'

import Examples from './components/Examples.jsx'

function App() {
  // Change mode between Upload images and Canvas
  const [isCanvasVisible, setIsCanvasVisible] = useState(false)

  return (
    <>
     <div className='mt-4 mb-4'>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center text-[#4682A9] font-bold"> Traduciendo la SignoEscritura </h1>
        <hr className="mx-2 mt-2.5  lg:mx-4 lg:mt-4 h-0.5 bg-[#91C8E4] rounded-full border-none"></hr>
      </div>
      <SwitchMode isChecked={isCanvasVisible} changeMode={setIsCanvasVisible}/>
      {mode(isCanvasVisible)}
      <SwitchMode className="theme-switcher"/>
      {/*<Examples />*/}
    </>
  )
}

const mode = (isCanvasVisible) => {
  if (isCanvasVisible)
    return <Canvas />;
  
    return <ImageMode/>;
  
}

export default App
