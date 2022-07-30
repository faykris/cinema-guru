import React from 'react';
import PropTypes from "prop-types";
import './general.css';

function SelectInput({ label, option, className, value, setValue }) {
  function hendleSelect(newValue) {
    setValue(newValue);
  }

  return <>
    <label htmlFor={label}>
      {label}
    </label>
    <select
      id={label}
      className={className}
      value={value}
      onChange={(event) => hendleSelect(event.target.value)}
    >
      {option && option.map((item) => {
        return (
          <option key={item}>
            {item}
          </option>
        );
      })}
    </select>
  </>
}

SelectInput.propTypes = {
  label: PropTypes.string,
  option: PropTypes.array,
  className: PropTypes.string,
  value: PropTypes.any,
  setValue: PropTypes.func,
}

SelectInput.defaultProps = {
  label: '',
  option: [],
  className: '',
  value: undefined,
  setValue: () => { },
}

export default SelectInput;
