// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MovieCard from './components/MovieCard'
import Home from "./pages/home"
import Favorites from './pages/Favorites'
function App() {
  const movieNumber=3

  return (
   <main className='main-content'>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path ="/favorites" element={<Favorites/>}/>

    </Routes>
   </main>

    
  
  )
}

// function Text({display}){
//   return (
//     <div> {display}</div>
//   )
// }


export default App
