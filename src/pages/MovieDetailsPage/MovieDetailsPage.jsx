import css from './MovieDetailsPage.module.css';
import { Suspense, useState, useEffect, useRef } from 'react';
import { useParams, Outlet,Link, useLocation } from "react-router-dom";
import { getMovieById } from "../../films-api";
import { RiArrowGoBackFill } from "react-icons/ri";
import { RiMovie2Line } from "react-icons/ri";
import { FaComment } from "react-icons/fa";

export default function MovieDetailsPage() {

  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/");

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
    
    return (
      <div>
        <div className={css.goBack}>
          <Link to={backLinkURLRef.current}>Go back<RiArrowGoBackFill size={20}/></Link>
        </div>
        {movie && (
          <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something went wrong. Please try again later...</p>}
            {!isLoading && !error && (
              <div className={css.movieDet}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className={css.movieDesc}>
                  <h1>{movie.title}</h1>
                <p><span className={css.subtitle}>Overview:</span><br></br>{movie.overview}</p>
                <p><span className={css.subtitle}>Release Date:</span> {movie.release_date}</p>
                <p><span className={css.subtitle}>User Score:</span> {movie.vote_average.toFixed(1)}</p>
                <p><span className={css.subtitle}>Genres:</span> {movie.genres.map(genre => genre.name).join(', ')}.</p>
                </div>
                
              </div>
            )}
            
          </div>        
        )}
          <ul className={css.addition}>
            <li>
              <Link to="/cast"><RiMovie2Line /> Cast</Link>
            </li>
            <li>
              <Link to="/reviews"><FaComment /> Reviews</Link>
            </li>
          </ul>
        <Suspense fallback={<b>Loading nested route...</b>}>
          <Outlet />
        </Suspense>
        {!movie && <p>Loading...</p>}
      </div>)
}