import MovieCard from "../components/MovieCard"
import { useState } from "react"


function Home(){
  const[searchQuery,setSearchQuery]=useState("")




    const movies=[
        {id:1,title:"John Wick",release_date:"2000"},
                {id:1,title:"CIA",release_date:"2025"},
        {id:1,title:"DSP",release_date:"2023"},

    ]
    const handleSearch=(e)=>{
      e.preventDefault()

      alert(searchQuery)

    }
    return <div className="Home">
        <form onSubmit={handleSearch} className="searh-form">
            <input type="text" placeholder="Search for Movies..." className="Search Input"
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}/>
            
            <button type="Submit" className="search-button">Search</button>
            
        </form>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>




    </div>
}

export default Home