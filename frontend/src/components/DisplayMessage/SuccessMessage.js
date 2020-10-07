import React from 'react';

const SuccessMessage = ({ msg }) => {
  return (
    <div className='alert alert-success' role='alert'>
      {msg}
    </div>
  );
};

export default SuccessMessage;
