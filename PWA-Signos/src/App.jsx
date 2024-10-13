import { useState } from 'react'
import Canvas from './components/Canvas.jsx'
import UploadImage from './components/UploadImage.jsx'
import './App.css'



function App() {

  return (
    <>
      <h3>PWA de prueba</h3>
      <div> <Canvas className="canvas"/></div>
      
      <UploadImage className="upload-image"/>
    </>
  )
}

export default App
