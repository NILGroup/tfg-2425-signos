import { useState, useEffect } from 'react'
import './App.css'
import SwitchMode from './components/SwitchMode.jsx'
import Canvas from './components/Canvas.js'

function App() {

  //useEffect(() => {
  //  Canvas(); // Llamamos la función para inicializar el canvas
  //}, []);

  return (
    <>
     <div className='mt-2 mb-4'>
        <h1 className="text-4xl text-center text-[#4682A9] font-bold"> TFG-2425-signos </h1>
        <hr className="mx-4 mt-3 h-0.5 bg-[#91C8E4] rounded-full border-none"></hr>
      </div>
      <SwitchMode className="theme-switcher"/>
    </>
  )
}

export default App
