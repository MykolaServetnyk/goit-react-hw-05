import axios from "axios";

const API_KEY = '8648a26cbba75088a20567d95039e52b';
const TOKEN_API = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjQ4YTI2Y2JiYTc1MDg4YTIwNTY3ZDk1MDM5ZTUyYiIsInN1YiI6IjY2MjUwMTRiMmUyYjJjMDE0OTY1YTc5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NlXNL9ofisAknDUXPQLlGivQpe5PqyAzMoQF2K0RlyY';

const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

const options = {
    headers: {
        Authorization: `Bearer ${TOKEN_API}`
    }
};

export const getTrendingMovies = async () => {
    const response = await axios.get(url, options)
    return response.data.results
}

export const getMovieById = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    return response.data
}