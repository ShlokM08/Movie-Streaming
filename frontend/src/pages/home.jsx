import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import "../css/Home.css"
import {getPopularMovies, searchMovies} from "../services/api"

function Home(){
  const[searchQuery,setSearchQuery]=useState("")

  const[movies, setMovies]=useState([])
   useEffect(()=>{},[])
    
    const handleSearch=(e)=>{
      e.preventDefault()

      alert(searchQuery)
      setSearchQuery("")

    }
    return <div className="Home">
        <form onSubmit={handleSearch} className="searh-form">
            <input type="text" placeholder="Search for Movies..." className="Search Input"
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}/>
            
            <button type="Submit" className="search-button">Search</button>
            
        </form>
      <div className="movies-grid">
        {movies.map(
          (movie) => 
          // movie.title.toLowerCase().startsWith(searchQuery)&&
          (<MovieCard movie={movie} key={movie.id} />
        )
        )}
      </div>




    </div>
}

export default Home