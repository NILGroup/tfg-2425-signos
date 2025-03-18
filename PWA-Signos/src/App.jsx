import { useState, useEffect } from 'react'
import './App.css'
import SwitchMode from './components/SwitchMode.jsx'

function App() {
  return (
    <>
     <div className='mt-2 mb-4'>
        <h1 className="text-4xl text-center text-[#4682A9] font-bold"> Traduciendo la SignoEscritura </h1>
        <hr className="mx-4 mt-3 h-0.5 bg-[#91C8E4] rounded-full border-none"></hr>
      </div>
      <SwitchMode className="theme-switcher"/>
    </>
  )
}

export default App
