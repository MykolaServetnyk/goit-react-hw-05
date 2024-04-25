import css from './HomePage.module.css';
import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../films-api";
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
    const [trandingMovies, settrandingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      async function fetchTrandingMovies() {
        try {
          setIsLoading(true);
          const data = await getTrendingMovies();
          settrandingMovies(data);
        } catch (error) {
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }
  
      fetchTrandingMovies();
    }, []);
  
    console.log(trandingMovies);

    return <div>
      <p>Trending today</p>
      { isLoading && <p>Loading...</p>}
      {trandingMovies.length >0 && <MovieList movies={trandingMovies}/>}
    </div>;
}
    