import './movies.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';



function Tag({ genre, filter, genres, setGenres }) {
  const [selected, setSelected] = useState(false);

  function handleTag() {

    if (selected === true) {

      genres.splice(genres.indexOf(genre), 1);
      setGenres(genres);
      setSelected(false);
      filter = false;
    } else {
      genres.splice(0, 0, genre)
      setGenres(genres);
      setSelected(true);
      filter = true;
    }

  }
  let g_text = genre.charAt(0).toUpperCase() + genre.slice(1);

  if (g_text.search('-') >= 0 && g_text.search('-') !== g_text.length) {
    g_text = g_text.slice(0, g_text.search('-') + 1) +
      genre.charAt(g_text.search('-') + 1).toUpperCase() +
      genre.slice(g_text.search('-') + 2);
  }

  return (
    <li className={
      selected ? 'tag-genre selected' : 'tag-genre'
    } onClick={() => handleTag()} >
      {g_text}
    </li>
  );
}

Tag.propTypes = {
  genre: PropTypes.string,
  filter: PropTypes.bool,
  genres: PropTypes.array,
  setGenres: PropTypes.func,
};

export default Tag;
