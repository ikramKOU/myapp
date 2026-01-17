import React from 'react';
import { Toast } from 'react-bootstrap';

const MyToast = ({ show, message, type }) => {
  const bgColor = type === 'success' ? 'success' : 'danger';

  return (
    <Toast
      show={show}
      className={`bg-${bgColor} text-white`}
      style={{ position: 'fixed', top: 20, right: 20, minWidth: '200px' }}
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default MyToast;
