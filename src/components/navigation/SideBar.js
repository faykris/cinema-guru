import './navigation.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolder, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import Activity from '../Activity';

library.add(faFolder, faStar, faClock);
const axios = require('axios').default;

function SideBar() {
  const [selected, setSelected] = useState('home');
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowSetActivities] = useState(false);

  const navigate = useNavigate();

  function setPage(pageName) {
    setSelected(pageName);
    navigate('/' + pageName);
  }

  useEffect(() => {
    setPage(selected);
    try {
      axios({
        method: 'get',
        url: 'http://localhost:8000/api/activity/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('items')).accessToken}`
        },
      }).then((response) => {
        setActivities(response.data)
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [showActivities]);

  function handleOnMouseOver(e) {
    e.currentTarget.classList.add('sidebar-opened');
    setShowSetActivities(true);
  }

  function handleOnMouseLeave(e) {
    e.currentTarget.classList.remove('sidebar-opened');
    setShowSetActivities(false);
  }

  return (
    <nav className={'sidebar'} onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
      <ul className='navigation'>
        <li className={selected === 'home' ? 'nav-selected' : ''} onClick={() => setPage('home')} >
          <FontAwesomeIcon icon={faFolder} />
          {showActivities ? ' Home' : ''}
        </li>
        <li className={selected === 'favorites' ? 'nav-selected' : ''} onClick={() => setPage('favorites')} >
          <FontAwesomeIcon icon={faStar} />
          {showActivities ? ' Favorites' : ''}
        </li>
        <li className={selected === 'watchlater' ? 'nav-selected' : ''} onClick={() => setPage('watchlater')} >
          <FontAwesomeIcon icon={faClock} />
          {showActivities ? ' Watch Later' : ''}
        </li>
      </ul>
      {showActivities ? <div className='lastest-activities'>
        <h3>Lastest Activities</h3>
        <ul>
          {activities.map(element => (
            <Activity key={element.id} object={element} />
          ))}
        </ul>
      </div> : ''}
    </nav>
  );
}

export default SideBar;