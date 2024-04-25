import css from './MovieDetailsPage.module.css';
import { useState,useEffect } from 'react';
import { useParams, Link, Outlet } from "react-router-dom";
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
        <>
            <Outlet />
        </>
    )
}