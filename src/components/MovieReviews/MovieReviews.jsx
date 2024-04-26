import css from './MovieReviews.module.css';
import { FaUser } from "react-icons/fa";
import { getMoviesReviews } from '../../films-api';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


export default function MovieReviews() {

    const { movieId } = useParams();
    const [moviesReviews, setMoviesReviews] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMovieReviews() {
            setIsLoading(true);
            try {
                const data = await getMoviesReviews(movieId);
                setMoviesReviews(data.results);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchMovieReviews();
    }, [movieId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error occurred while fetching data.</div>;
    }
    console.log(moviesReviews);
    
    return (
        <div>
            <ul>
        {moviesReviews !== null && moviesReviews.map(({id, author, content}) => {
            return (
                <li key={id}>
                    <p><FaUser />Author:{author}</p>
                    <p>Content:{ content}</p>
                </li>
            )
        })}

    </ul>
        </div>)
   
}