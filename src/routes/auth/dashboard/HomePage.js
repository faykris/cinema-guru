import './dashboard.css';
import React, { useState, useEffect } from 'react';
import Filter from '../../../components/movies/Filter';
import MovieCard from '../../../components/movies/MovieCard';
import Button from '../../../components/general/Button';

const axios = require('axios').default;

function HomePage() {

  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("latest");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  function loadMovies(page) {
    try {
      axios({
        method: 'get',
        url: 'http://localhost:8000/api/titles/advancedsearch',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('items')).accessToken}`
        },
        params: {
          maxYear, minYear, genres: genres.join(','), title, page, sort
        },
      }).then((response) => {
        setMovies(response.data.titles);
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    loadMovies(page);
  });

  return (
    <div className='homepage'>
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
      />
      <div className='load-movies'>
        <ul className='movie-list'>
          {movies.map(movie => (
            <MovieCard key={movie.imdbId} movie={movie} />
          ))}
        </ul>
        {movies.length >= 1 && (
          <div className='load-more-div'>
            <Button
              className='load-more'
              label='Load More...'
              onClick={() => {
                setPage(page + 1);
                loadMovies(page);
              }}
            />
          </div>
        )
        }
      </div>
    </div >
  );
}


export default HomePage;
