import React, { useState } from 'react';
import PropTypes from "prop-types";
import Button from '../../components/general/Button';
import Login from './Login';
import Register from './Register';
import './auth.css';
const axios = require('axios').default;

function Authentication({ setIsLoggedIn, setUserUsername }) {
  const [_switch, set_switch] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState(" ");

  let classButtonA = "";
  let classButtonB = "";

  if (_switch === true) {
    classButtonA = 'tab selected';
    classButtonB = 'tab unselected';

  } else {
    classButtonA = 'tab unselected';
    classButtonB = 'tab selected';
  }

  function getUsername(accessToken) {
    localStorage.setItem('items', JSON.stringify({ accessToken }));
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/auth/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      data: {
        username,
        password,
      }
    }).then((response) => {
      setUserUsername(response.data.username);
      setIsLoggedIn(true);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (username !== '' && password !== '') {
      if (_switch) {
        axios({
          method: 'post',
          url: 'http://localhost:8000/api/auth/login',
          headers: { 'Content-Type': 'application/json' },
          data: {
            username,
            password,
          }
        }).then((response) => {
          //clearFields();
          setErrMsg(' ');
          getUsername(response.data.accessToken);
        }).catch((error) => {
          console.log(error);
          setErrMsg('Username and/or password are incorrects');
        });
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:8000/api/auth/register',
          headers: { 'Content-Type': 'application/json' },
          data: {
            username,
            password,
          }
        }).then((response) => {
          localStorage.setItem('items', JSON.stringify({ accessToken: response.data.accessToken }));
          //clearFields();
          setErrMsg(' ');
          getUsername(response.data.accessToken);
        }).catch((error) => {
          console.log(error);
          setErrMsg('User is already registred, try access with Sign In');
        });
      }
    } else {
      if (username === '' && password !== '') {
        setErrMsg('You must insert your username');
      } else if (username !== '' && password === '') {
        setErrMsg('You must insert your password');
      } else {
        setErrMsg('You must insert your username and password');
      }
    }
  }

  function clearFields() {
    setUsername('');
    setPassword('');
    setErrMsg(' ');
  }
  // onClick={() => clearFields()}
  return (
    <form id='auth' className='authentication' onSubmit={handleSubmit} >
      <div className='auth_tabs' >
        <Button label='Sign In' className={classButtonA} onClick={(e) => {
          e.preventDefault();
          set_switch(true);
          clearFields();
        }} />
        <Button label='Sign Up' className={classButtonB} onClick={(e) => {
          e.preventDefault();
          set_switch(false);
          clearFields();
        }} />
      </div>
      <div className='auth_body'>
        {_switch === true ?
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            errMsg={errMsg}
          /> :
          <Register
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            errMsg={errMsg}
          />}
      </div>
    </form>
  );

}
Authentication.propTypes = {
  setIsLoggedIn: PropTypes.func,
  setUserUsername: PropTypes.func,
}

export default Authentication;
