import { useState} from 'react'
import './App.css'
import SwitchMode from './components/SwitchMode.jsx'
import ImageMode from './components/ImageMode.jsx'
import Canvas from './components/Canvas.jsx'


function App() {
  // Change mode between Upload images and Canvas
  const [isCanvasVisible, setIsCanvasVisible] = useState(false)

  return (
    <>
     <div className='mt-2 mb-4'>
        <h1 className="text-4xl text-center text-[#4682A9] font-bold"> Traduciendo la SignoEscritura </h1>
        <hr className="mx-4 mt-3 h-0.5 bg-[#91C8E4] rounded-full border-none"></hr>
      </div>
      <SwitchMode isChecked={isCanvasVisible} changeMode={setIsCanvasVisible}/>
      {mode(isCanvasVisible)}
    </>
  )
}

const mode = (isCanvasVisible) => {
  if (isCanvasVisible)
    return <Canvas />;
  
    return <ImageMode/>;
  
}

export default App
