import './components.css';
import React from 'react';
import PropTypes from 'prop-types';

function Activity({ object }) {
  const username = object.user.username.charAt(0).toUpperCase() + object.user.username.slice(1) || 'User';
  const title = object.title.title || 'No title';
  let activityType = ''
  const updatedAt = new Date(object.updatedAt).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" }) || 'No date';
  const action = object.activityType === 'watchLater' || object.activityType === 'favorite' ? 'added' : 'removed';
  const connector = object.activityType === 'removeFavorited' || object.activityType === 'removeWatchLater' ? 'from' : 'to';

  switch (object.activityType) {
    case 'favorite':
      activityType = 'Favorites';
      break;
    case 'watchLater':
      activityType = 'Watch Later';
      break;
    case 'removeFavorited':
      activityType = 'Favorites';
      break;
    case 'removeWatchLater':
      activityType = 'Watch Later';
      break;
    default:
      activityType = 'No Activity';
      break;
  }

  return (
    <li className='activity'>
      <p>
        <span>{username}</span> {action} <span>{title}</span> {connector} {activityType} - {updatedAt}
      </p>
    </li>
  );
}

Activity.propTypes = {
  object: PropTypes.object,
}

export default Activity;
