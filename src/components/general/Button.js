import React from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './general.css';

function Button({ label, className, onClick, icon }) {

  // function handleClick(e) {
  //   onClick(e)
  // }

  return <>
    <button
      className={className}
      onClick={onClick}
    >
      {icon && (<FontAwesomeIcon icon={icon} />)}
      {label}
    </button>
  </>
}

Button.propType = {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: () => { },
  icon: PropTypes.any,
}

export default Button;
