import React from 'react';

const Books = () => {
  return (
    <div>
      <div className='row'>
        <div className='col'>
          <table class='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>Author</th>
                <th scope='col'>Book Name</th>
                <th scope='col'>Delete</th>
                <th scope='col'>Update</th>
              </tr>
            </thead>
            <tbody>
              <tr class='table-dark'>
                <th scope='row'>Emma</th>
                <td>React</td>
                <td>Delete</td>
                <td>Update</td>
              </tr>
              <tr class='table-dark'>
                <th scope='row'>Emma</th>
                <td>React</td>
                <td>Delete</td>
                <td>Update</td>
              </tr>
              <tr class='table-dark'>
                <th scope='row'>Emma</th>
                <td>React</td>
                <td>Delete</td>
                <td>Update</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Books;
