import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Canvas from './components/Canvas.jsx'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h3>PWA de prueba</h3>
      <Canvas className="canvas"/>
    </>
  )
}

export default App
