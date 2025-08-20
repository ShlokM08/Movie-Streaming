import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { getMovieVideos, getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/TrailerPage.css";

export default function Trailer() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const titleFromQuery = params.get("title") || "Trailer";

  // data
  const [movie, setMovie] = useState(null);
  const [key, setKey] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  // favorites
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // Load details + videos in parallel
        const [details, videos] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id),
        ]);
        if (!active) return;

        setMovie(details);

        const yt = videos.filter((v) => v.site === "YouTube");
        const trailers = yt.filter((v) => v.type === "Trailer");
        const best = (trailers.length ? trailers : yt)[0];
        if (!best) setErr("No trailer available.");
        setKey(best?.key || null);
      } catch (e) {
        console.error(e);
        if (active) setErr("Failed to load trailer.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const iframeSrc = useMemo(
    () =>
      key
        ? `https://www.youtube.com/embed/${key}?autoplay=1&rel=0&modestbranding=1`
        : "",
    [key]
  );

  const pageTitle = movie?.title || titleFromQuery;

  const onFavClick = () => {
    if (!movie) return;
    favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  return (
    <div className="trp-wrap">
      <header className="trp-header container">
        <Link to="/" className="trp-back">← Back</Link>

        <h1 className="trp-title">{pageTitle}</h1>

        <button
          className={`trp-fav ${favorite ? "active" : ""}`}
          onClick={onFavClick}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          title={favorite ? "Remove from favorites" : "Add to favorites"}
          disabled={!movie}
        >
          ♥ {favorite ? "Favorited" : "Favorite"}
        </button>
      </header>

      <main className="container trp-main">
        {loading && <div className="trp-spinner" />}
        {err && <div className="trp-error">{err}</div>}

        {!loading && !err && key && (
          <div className="trp-player">
            <iframe
              src={iframeSrc}
              title={`${pageTitle} — Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}
      </main>
    </div>
  );
}
