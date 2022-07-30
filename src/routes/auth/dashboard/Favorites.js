import './dashboard.css';
import MovieCard from '../../../components/movies/MovieCard';
import React, { useState, useEffect } from 'react';

const axios = require('axios').default;
const title = 'Movies you like';

function Favorites() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      axios({
        method: 'get',
        url: 'http://localhost:8000/api/titles/favorite',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('items')).accessToken}`,
        },
      }).then((response) => {
        setMovies(response.data);
      });
    } catch (error) {
      console.error(error.message);
    }
  })

  return (
    <div className='favorites'>

      <div className='load-movies'>
        <div className='page-title'>
          <h1>{title.toUpperCase()}</h1>
        </div>
        <ul className='movie-list'>
          {movies.map(movie => (
            <MovieCard key={movie.imdbId} movie={movie} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Favorites;