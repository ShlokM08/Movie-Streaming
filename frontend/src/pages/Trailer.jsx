import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { getMovieVideos } from "../services/api";
import "../css/TrailerPage.css";

export default function Trailer() {
  const { id } = useParams();               // TMDB movie id
  const [params] = useSearchParams();
  const titleFromQuery = params.get("title") || "Trailer";

  const [key, setKey] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const vids = await getMovieVideos(id);
        const yt = vids.filter(v => v.site === "YouTube");
        const trailers = yt.filter(v => v.type === "Trailer");
        const best = (trailers.length ? trailers : yt)[0];
        if (!active) return;
        if (!best) setErr("No trailer available.");
        setKey(best?.key || null);
      } catch (e) {
        console.error(e);
        if (active) setErr("Failed to load trailer.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [id]);

  const iframeSrc = useMemo(() => (
    key ? `https://www.youtube.com/embed/${key}?autoplay=1&rel=0&modestbranding=1` : ""
  ), [key]);

  return (
    <div className="trp-wrap">
      <header className="trp-header container">
        <Link to="/" className="trp-back">← Back</Link>
        <h1 className="trp-title">{titleFromQuery}</h1>
      </header>

      <main className="container trp-main">
        {loading && <div className="trp-spinner" />}
        {err && <div className="trp-error">{err}</div>}
        {!loading && !err && key && (
          <div className="trp-player">
            <iframe
              src={iframeSrc}
              title={titleFromQuery}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}
      </main>
    </div>
  );
}
