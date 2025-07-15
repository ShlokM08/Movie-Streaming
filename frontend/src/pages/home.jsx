import MovieCard from "../components/MovieCard"
import { useState } from "react"
import "../css/Home.css"

function Home(){
  const[searchQuery,setSearchQuery]=useState("")




    const movies=[
        {id:1,title:"John Wick",release_date:"2000"},
        {id:2,title:"CIA",release_date:"2025"},
        {id:3,title:"DSP",release_date:"2023"},
        {id:4,title:"Kick",release_date:"2018"},

    ]
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