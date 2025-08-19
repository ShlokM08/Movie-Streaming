import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
function Favorites(){
const { favorites } = useMovieContext();
if (favorites && favorites.length) {
return (
<div className="favorites section">
<div className="container">
<h2>Your Favorites</h2>
<div className="movies-grid">
{favorites.map((movie) => (<MovieCard movie={movie} key={movie.id} />))}
</div>
</div>
</div>
);
}
return (
<div className="favorites-empty section">
<h2>No favorite movies yet</h2>
<p>Start adding your favorite movies here to store them.</p>
</div>
);
}
export default Favorites;