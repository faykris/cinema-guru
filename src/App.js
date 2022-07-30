import React, { useState, useEffect } from 'react';
import './App.css';
import Authentication from './routes/auth/Authentication';
import Dashboard from './routes/auth/dashboard/Dashboard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee, faUser, faKey, faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee, faUser, faKey, faSearch);

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [userUsernamestring, setuserUsernamestring] = useState("");

  useEffect(() => {
    if (localStorage.getItem('items')) {
      fetch("http://localhost:8000/api/auth/", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('items')).accessToken || ''}`,
          'Content-Type': 'application/json',
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          setIsLoggedIn(true);
          setuserUsernamestring(response.username);
        });
    }
  });

  return (
    <div className="App">
      {isLoggedIn && JSON.parse(localStorage.getItem('items')).accessToken ?
        <Dashboard setIsLoggedIn={setIsLoggedIn} userUsername={userUsernamestring} />
        :
        <div className='container'>
          <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setuserUsernamestring} />
        </div>
      }
    </div>
  );
}

export default App;
