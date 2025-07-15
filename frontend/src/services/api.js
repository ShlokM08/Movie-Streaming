const API_KEY="d2befeaddf6c665c8936a3cf510d95c2"
export const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies= async()=>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data=response.json()
    return data.results
}

export const searchMovies= async(query)=>{
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY} &query=${encodeURIComponent()}`)
    const data=response.json()
    return data.results
}