import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div class='alert alert-warning' role='alert'>
      {error}
    </div>
  );
};

export default ErrorMessage;
