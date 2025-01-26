import { useState } from 'react'
import Canvas from './components/Canvas.jsx'
import UploadImage from './components/UploadImage.jsx'
import './App.css'



function App() {

  return (
    <>
      <h1 className="title"> TFG-2425-signos </h1>   
      <UploadImage className="image-buttons"/>
    </>
  )
}

export default App
