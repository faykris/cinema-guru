import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import './dashboard.css';
import Header from '../../../components/navigation/Header';
import SideBar from '../../../components/navigation/SideBar';
import HomePage from './HomePage';
import Favorites from './Favorites';
import WatchLater from './WatchLater';

function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <>
      <div className='dashboard'>
        <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
        <div className='dashboard-body'>
          <BrowserRouter>
            <SideBar />
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/home" element={<HomePage />} />
              <Route exact path="/favorites" element={<Favorites />} />
              <Route exact path="/watchlater" element={<WatchLater />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>

    </>
  );
}

Dashboard.propTypes = {
  userUsername: PropTypes.string,
  setIsLoggedIn: PropTypes.func,
}

export default Dashboard;
