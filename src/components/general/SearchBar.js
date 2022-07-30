import React from 'react';
import PropTypes from "prop-types";
import './general.css';

function SearchBar({ title, setTitle }) {

  function hendleInput(newValue) {
    setTitle(newValue);
    //console.log(title);
  }

  return <>
    <input
      id='search'
      type='search'
      placeholder='&#xf002; Search Movies'
      onChange={(event) => hendleInput(event.target.value)}
    />
  </>
}

SearchBar.propTypes = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
}

SearchBar.defaultProps = {
  title: '',
  setTitle: () => { },
}

export default SearchBar;
