const API_KEY="d2befeaddf6c665c8936a3cf510d95c2"
const BASE_URL = "https://api.themoviedb.org/3";    // not exported here, but you could if needed

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data     = await response.json();            // ← **await** the `.json()`
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data     = await response.json();            // ← **await** here too
  return data.results;
};
