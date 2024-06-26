import React from 'react';
import Unauthorized from './Unauthorized';

const ProtectedComponent = ({ element, allowedUserTypes }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && allowedUserTypes.includes(user.user_type)) {
    return element;
  } else {
    return <Unauthorized />;
  }
};

export default ProtectedComponent;
