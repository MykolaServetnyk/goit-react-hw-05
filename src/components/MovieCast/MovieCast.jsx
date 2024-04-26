import css from './MovieCast.module.css';
import { getMoviesCast } from '../../films-api';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export default function MovieCast() {
    const { movieId } = useParams();
    const [moviesCast, setMoviesCast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMovieCast() {
            setIsLoading(true);
            try {
                const data = await getMoviesCast(movieId);
                setMoviesCast(data.cast);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchMovieCast();
    }, [movieId]);

    console.log(moviesCast);
    return (
        <div>
            {isLoading && <p>Loading...</p>}
        <ul>
            {moviesCast!==null && moviesCast.map(({ credit_id, profile_path, original_name, character }) => {
                return (
                    <li key={credit_id}>
                        <img src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt={original_name} />
                        <h2>{original_name}</h2>
                        <p>{character}</p>
                    </li>
                );
            })}
            </ul>
           
        </div>
    );
}
