// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './/css/App.css'
import MovieCard from './components/MovieCard'
import Home from "./pages/home"
import Favorites from './pages/Favorites'
import Navbar from './components/NavBar'
import Trailer from "./pages/Trailer";

import { MovieProvider } from './contexts/MovieContext'
function App() {
  //const movieNumber=3

  return (
    <MovieProvider>
   <div>
    <Navbar/>
    <main className='main-content'>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path ="/favorites" element={<Favorites/>}/>
    <Route path="/movie/:id/trailer" element={<Trailer />} />
    </Routes>
   </main>
   </div>
   </MovieProvider>

    
  
  )
}

// function Text({display}){
//   return (
//     <div> {display}</div>
//   )
// }


export default App
