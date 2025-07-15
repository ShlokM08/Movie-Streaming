//forver
import "../css/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"
function Favorites(){

    const {favorites} = useMovieContext()
    if(favorites){
        return<div className="favorites">
            <h2>Your Favourites</h2>
            <div className="movies-grid">
        {favorites.map(
          (movie) => 
          // movie.title.toLowerCase().startsWith(searchQuery)&&
          (<MovieCard movie={movie} key={movie.id} />
        )
        )}
      </div>
        </div>
        
    }
    return <div className="favorites-empty">
        <h2>No favorite movies yet</h2>
        <p>start adding your fav movies here to store them</p>
    </div>
    
}
export default Favorites