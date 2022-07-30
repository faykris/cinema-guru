import './movies.css';
import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../general/SearchBar';
import Input from '../general/Input';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';

const genresList = [
  'action', 'drama', 'comedy', 'biography', 'romance',
  'thriller', 'war', 'history', 'sport',
  'sci-fi', 'documentary', 'crime', 'fantasy'
];
const filterOptions = ['latest', 'oldest', 'highestrated', 'lowestrated'];

function Filter({ minYear, setMinYear, maxYear, setMaxYear, sort, setSort, genres, setGenres, title, setTitle }) {
  return (
    <div className='filter'>
      <div className='filter-inputs'>
        <div className='f-search'>
          <SearchBar title={title} setTitle={setTitle} />
        </div>
        <div className='f-field'>
          <Input className='f-input' label='Min Date:' value={minYear} setValue={setMinYear} type='number' />
        </div>
        <div className='f-field'>
          <Input className='f-input' label='Max Date:' value={maxYear} setValue={setMaxYear} type='number' />
        </div>
        <div className='f-field'>
          <SelectInput className='f-input' label='Sort:' value={sort} setValue={setSort} option={filterOptions} />
        </div>
      </div>
      <div className='filter-genres'>
        <ul className='genres-list'>
          {genresList.map(element => (
            <Tag key={element} genre={element} filter={false} genres={genres} setGenres={setGenres} />
          ))}
        </ul>
      </div>
    </div>
  );
}

Filter.propTypes = {
  minYear: PropTypes.number,
  setMinYear: PropTypes.func,
  maxYear: PropTypes.number,
  setMaxYear: PropTypes.func,
  sort: PropTypes.string,
  setSort: PropTypes.func,
  genres: PropTypes.array,
  setGenres: PropTypes.func,
  title: PropTypes.string,
  setTitle: PropTypes.func,
};

export default Filter;
