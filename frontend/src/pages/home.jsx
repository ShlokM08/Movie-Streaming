import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import "../css/Home.css"
import {getPopularMovies, searchMovies} from "../services/api"

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
   

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);
    
    const handleSearch=async(e)=>{
      e.preventDefault()

      if(!searchQuery.trim()) return
      if(loading) return


      setLoading(true)

      try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
        
      } catch (error) {
        console.log(error)
        
      }
      finally{
        setLoading(false)
      }

      setSearchQuery("")

    }
    return <div className="Home">
        <form onSubmit={handleSearch} className="searh-form">
            <input type="text" placeholder="Search for Movies..." className="Search Input"
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}/>
            
            <button type="Submit" className="search-button">Search</button>
            
        </form>

        {error &&<div className="error-message">{error}</div>}
        {loading ? (
          <div className="Loading...">Loading...</div>):
          (
            <div className="movies-grid">
        {movies.map(
          (movie) => 
          // movie.title.toLowerCase().startsWith(searchQuery)&&
          (<MovieCard movie={movie} key={movie.id} />
        )
        )}
      </div>
          )}
      




    </div>
}

export default Home