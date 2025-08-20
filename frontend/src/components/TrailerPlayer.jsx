import { useEffect, useState, useCallback } from "react";
import { getMovieVideos } from "../services/api";
import "../css/TrailerPlayer.css";

export default function TrailerPlayer({ movieId, open, onClose, title = "Trailer" }) {
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const load = useCallback(async () => {
    if (!open || !movieId) return;
    setLoading(true);
    setErr(null);
    try {
      const vids = await getMovieVideos(movieId);
      const best = vids?.[0];
      setVideoKey(best?.key || null);
      if (!best) setErr("No trailer available.");
    } catch (e) {
      console.error(e);
      setErr("Failed to load trailer.");
    } finally {
      setLoading(false);
    }
  }, [open, movieId]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="tp-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${title} modal`}>
      <div className="tp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tp-close" onClick={onClose} aria-label="Close trailer">✕</button>
        <h3 className="tp-title">{title}</h3>

        {loading && <div className="tp-spinner" aria-label="Loading trailer" />}
        {err && <div className="tp-error">{err}</div>}

        {!loading && !err && videoKey && (
          <div className="tp-player">
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
}
