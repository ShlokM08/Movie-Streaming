// src/pages/Landing.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Landing.css";

function Landing() {
  // Read ?q= from the URL for searching
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();
  const isSearching = q.length > 0;

  // State
  const [heroMovie, setHeroMovie] = useState(null);
  const [trending, setTrending] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending OR search results
  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        if (isSearching) {
          const r = await searchMovies(q);
          if (!active) return;
          setResults(r);
        } else {
          const popular = await getPopularMovies();
          if (!active) return;
          setTrending(popular);
          setHeroMovie(popular?.[0] || null);
        }
      } catch (e) {
        console.error(e);
        if (active) setError("Something went wrong. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };

    run();
    return () => {
      active = false;
    };
  }, [q, isSearching]);

  // Hero background using the first popular movie's backdrop
  const heroBg = useMemo(() => {
    if (!heroMovie?.backdrop_path) return undefined;
    return {
      backgroundImage: `linear-gradient(90deg, rgba(10,15,29,.88) 0%, rgba(10,15,29,.65) 40%, rgba(10,15,29,0) 70%), url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }, [heroMovie]);

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero" style={heroBg}>
        <div className="container hero-inner">
          <div className="eyebrow">Cinematic Picks</div>
          <h1 className="hero-title">
            Discover Your Next <span>Favorite Film</span>
          </h1>
          <p className="hero-sub">
            Explore thousands of movies, create your personal watchlist, and
            never miss the perfect film for your mood.
          </p>
          <div className="hero-actions">
            <Link to="#trending" className="btn btn-primary">
              Start Watching
            </Link>
            <a href="#learn" className="btn btn-ghost">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Search results or Trending */}
      <section id="trending" className="section container">
        <div className="section-head">
          <h2>{isSearching ? `Results for "${q}"` : "Trending Now"}</h2>
          <p className="muted">
            {isSearching
              ? "Top matches across the catalog"
              : "The most popular movies this week"}
          </p>
        </div>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="spinner" aria-label="Loading" />
        ) : (
          <div className={isSearching ? "movies-grid" : "rail"}>
            {(isSearching ? results : trending).map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                variant={isSearching ? "grid" : "rail"}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Landing;
