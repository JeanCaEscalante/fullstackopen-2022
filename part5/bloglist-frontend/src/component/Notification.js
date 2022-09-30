import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({notification}) => {
  switch (notification.name) {
    case 'error':
      return (
        <div className='alert alert-danger'>
          {notification.message}
        </div>
      );
    case 'sucess':
      return (
        <div className='alert alert-success'>
          {notification.message}
        </div>
      );
    case 'warning':
      return (
        <div className='alert alert-warning'>
          {notification.message}
        </div>
      );
    default:
      return null;
  };
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default Notification;
