import React from 'react';
import '../../routes/auth/auth.css';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from '@fortawesome/free-solid-svg-icons';


function Header({ userUsername, setIsLoggedIn }) {

  function setLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('items');
  }

  return (
    <nav className='header'>
      <div className='header-title'>
        <p>Cinema Guru</p>
      </div>
      <div className='header-logout'>
        <img src='https://picsum.photos/100/100' alt='Profile' />
        <p>Welcome, {userUsername.charAt(0).toUpperCase() + userUsername.slice(1)}! </p>
        <span className='logout' onClick={() => setLogOut()}>
          <FontAwesomeIcon icon={faSignOut} /> Logout
        </span>
      </div>
    </nav>
  );

}

Header.propTypes = {
  userUsername: PropTypes.string,
  setIsLoggedIn: PropTypes.func,
}

export default Header;
