import React from 'react';
import PropTypes from "prop-types";
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import './auth.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee, faUser, faKey, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee, faUser, faKey, faSearch, faPlus);

function Login({ username, password, setUsername, setPassword, handleSubmit, errMsg }) {
  return <>
    <h3>Sign in with your account</h3>
    <Input icon={faUser} label=' Username' className='input' type='text' setValue={setUsername} value={username} inputAttributes={{ required: true }} />
    <Input icon={faKey} label=' Password' className='input' type='password' setValue={setPassword} value={password} inputAttributes={{ required: true }} />
    <p className='err-message-login'>{errMsg}</p>
    <div className='auth_footer'>
      <Button icon={faKey} label=' Sign In' className='button' onClick={handleSubmit} />
    </div>
  </>
}

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  setUsername: PropTypes.func,
  setPassword: PropTypes.func,
}

export default Login;
