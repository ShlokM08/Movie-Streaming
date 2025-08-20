// src/components/MovieCard.jsx
import { useNavigate } from "react-router-dom";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie, variant = "grid" }) {
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  const favorite = isFavorite(movie.id);
  const rating = movie.vote_average
    ? (Math.round(movie.vote_average * 10) / 10).toFixed(1)
    : null;

  function onFavoriteClick(e) {
    e.preventDefault();
    favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  }

  function goToTrailer(e) {
    e.preventDefault();
    navigate(`/movie/${movie.id}/trailer?title=${encodeURIComponent(movie.title)}`);
    // If you prefer a new tab instead:
    // window.open(`/movie/${movie.id}/trailer?title=${encodeURIComponent(movie.title)}`, "_blank");
  }

  return (
    <div className={`movie-card ${variant === "rail" ? "rail-card" : ""}`}>
      <div className="movie-poster">
        {rating && <div className="rating-badge">★ {rating}</div>}

        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/assets/react.svg" // simple fallback if poster is missing
          }
          alt={movie.title}
          loading="lazy"
        />

        <div className="movie-overlay">
          <div className="overlay-actions">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              title={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              ♥
            </button>

            <button
              className="trailer-btn"
              onClick={goToTrailer}
              aria-label="Play trailer"
              title="Play trailer"
            >
              ▶ Trailer
            </button>
          </div>
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
