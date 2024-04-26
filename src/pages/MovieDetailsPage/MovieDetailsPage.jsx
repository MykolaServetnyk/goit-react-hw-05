import css from './MovieDetailsPage.module.css';
import { useState,useEffect } from 'react';
import { useParams, Outlet,Link } from "react-router-dom";
import { getMovieById } from "../../films-api";




export default function MovieDetailsPage() {

  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        const data = await getMovieById(movieId);
        setMovie(data)
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  console.log(movie);

    
    return (
      <div>
        {movie && (
          <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something went wrong. Please try again later...</p>}
            {!isLoading && !error && (
              <div>
                <h1>{movie.title}</h1>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <p>Overview:{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>User Score: {movie.vote_average.toFixed(1)}</p>
                <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}.</p>
              </div>
            )}
            
          </div>        
        )}
          <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
        </ul>
        <Outlet />
            {!movie && <p>Loading...</p>}
      </div>)
}