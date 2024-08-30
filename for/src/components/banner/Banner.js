import React, { useEffect, useState } from 'react';
import axios from '../../utils/axious'; 
import requests from '../../utils/requests';
import './banner.css'

const Banner = () => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                setMovie(request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]);
            } catch (error) {
                console.log("Error", error);
            }
        })();
    }, []);
    function truncate(str,n){
        return str?.length>n?str.substr(0,n-1)+'...':str;
    }
    const backgroundImageUrl = movie?.backdrop_path
        ? `url(https://images.tmdb.org/t/p/original${movie.backdrop_path})`
        : '';
  
    return (
        <div
            className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: backgroundImageUrl,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className='banner_contents'>
                <h1 className='banner_title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className='banner_buttons'>
                    <button className='banner_buttons play'>Play</button>
                    <button className='banner_buttons List'>My List</button>
                </div>
                {/* Here you could use the truncate function if it's defined */}
                <h1 className='banner_description'>{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className='banner_fadebottom'></div>
        </div>
    );
}

export default Banner;