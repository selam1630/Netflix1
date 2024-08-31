import React, { useEffect, useState } from 'react';
import "./row.css";
import axios from '../../../utils/axious';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube'; 

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]); 
    const [trailerUrl, setTrailerUrl] = useState("");
    const base_url = "https://images.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error); 
            }
        };

        fetchMovies();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.title || movie?.name || movie.original_name)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v")); 
                })
                .catch((error) => console.error("Error fetching trailer:", error)); // Handle any errors from movieTrailer
        }
    };

    return (
        <div className='row'>
            <h1>{title}</h1>
            <div className='row_posters'>
                {movies.map((movie, index) => (
                    <img
                        onClick={() => handleClick(movie)}
                        key={index}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} 
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                    />
                ))}
            </div>
            {trailerUrl && 
                <YouTube videoId={trailerUrl} opts={{
                    height: '390',
                    width: '100%',
                    playerVars: { 
                        autoplay: 1, 
                    },
                }} />
            }
        </div>
    );
}

export default Row;