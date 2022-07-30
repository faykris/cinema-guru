import './movies.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faClock as farClock } from '@fortawesome/free-regular-svg-icons';
const axios = require('axios').default;



function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  const defaultImage = '/unavailable.png';

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
        response.data.map(element => {
          if (element.imdbId === movie.imdbId) {
            return setIsFavorite(true);
          }
          return undefined;
        });
      });

      axios({
        method: 'get',
        url: 'http://localhost:8000/api/titles/watchlater',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('items')).accessToken}`,
        },
      }).then((response) => {
        response.data.map(element => {
          if (element.imdbId === movie.imdbId) {
            return setIsWatchLater(true);
          }
          return undefined;
        });
      });

    } catch (error) {
      console.error(error.message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick(type) {
    if (type === 'watchlater') {
      axios({
        method: isWatchLater ? 'delete' : 'post',
        url: `http://localhost:8000/api/titles/watchlater/${movie.imdbId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('items')).accessToken}`,
        },
      }).then((response) => {
        setIsWatchLater(!isWatchLater);
      });
    } else if (type === 'favorite') {
      axios({
        method: isFavorite ? 'delete' : 'post',
        url: `http://localhost:8000/api/titles/favorite/${movie.imdbId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('items')).accessToken}`,
        },
      }).then((response) => {
        setIsFavorite(!isFavorite);
      });
    }
  }

  return (
    <li key={movie.imdbId} className='moviecard' >
      <div className='movie-image' style={
        { backgroundImage: `url("${movie.imageurls[0]}"), url("${defaultImage}")` }
      }>
        <div className='movie-actions'>
          <div className='movie-group'>
            <div className='movie-icon' onClick={() => {
              handleClick('watchlater');
            }} >
              {isWatchLater ?
                <FontAwesomeIcon icon={faClock} inverse /> :
                <FontAwesomeIcon icon={farClock} inverse />
              }
            </div>
            <div className='movie-icon' onClick={() => {
              handleClick('favorite');
            }}>
              {isFavorite ?
                <FontAwesomeIcon icon={faStar} inverse /> :
                <FontAwesomeIcon icon={farStar} inverse />
              }
            </div>
          </div>
        </div>
        <div className='movie-title'>
          <h3>{movie.title}</h3>
        </div>
      </div>

      <p className='movie-body'>
        {movie.synopsis && movie.synopsis.length >= 100 ?
          String(movie.synopsis).substring(0, 100) + '..' :
          movie.synopsis
        }
      </p>
      <div className='movie-footer'>
        {
          movie.genres.map(element => (
            <span className='movie-button' key={element}>
              {element}
            </span>
          ))
        }
      </div>
    </li >
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object,
};

export default MovieCard;
