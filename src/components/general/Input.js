import React from 'react';
import PropTypes from "prop-types";
import './general.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Input({ label, type, className, value, setValue, icon, inputAttributes }) {

  function hendleInput(newValue) {
    setValue(type === 'number' ? parseInt(newValue, 10) : newValue);
  }

  return <>
    <label htmlFor={label}>
      {icon && (<FontAwesomeIcon icon={icon} />)}
      {label}
    </label>
    <input
      id={label}
      type={type}
      className={className}
      value={value}
      onChange={(event) => hendleInput(event.target.value)}
      {...inputAttributes}
    ></input>
  </>
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.any,
  setValue: PropTypes.func,
  icon: PropTypes.any,
  inputAttributes: PropTypes.object,
};

Input.defaultProps = {
  label: '',
  type: 'text',
  className: '',
  value: undefined,
  setValue: () => { },
  inputAttributes: {},
}


export default Input;