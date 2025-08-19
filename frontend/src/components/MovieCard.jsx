import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
function MovieCard({ movie, variant = "grid" }) {
const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
const favorite = isFavorite(movie.id);
const rating = movie.vote_average ? (Math.round(movie.vote_average * 10) / 10).toFixed(1) : null;


function onFavoriteClick(e) {
e.preventDefault();
favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
}


return (
<div className={`movie-card ${variant === "rail" ? "rail-card" : ""}`}>
<div className="movie-poster">
{rating && <div className="rating-badge">★ {rating}</div>}
<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
<div className="movie-overlay">
<button
className={`favorite-btn ${favorite ? "active" : ""}`}
onClick={onFavoriteClick}
aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
title={favorite ? "Remove from favorites" : "Add to favorites"}
>
♥
</button>
</div>
</div>
<div className="movie-info">
<h3 title={movie.title}>{movie.title}</h3>
<p>{movie.release_date?.split("-")[0]}</p>
</div>
</div>
);
}
export default MovieCard;