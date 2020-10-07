import React from 'react';
import './Profile.css';
const Profile = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col mt-5'>
          <div class='card m-auto ' style={{ width: '50%' }}>
            <img
              src='https://pixabay.com/photos/child-reading-bible-bed-african-945422/'
              class='card-img-top'
              alt='...'
            />
            <div class='card-body'>
              <h5 class='card-title'>Card title</h5>
              <p class='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href='#' class='btn btn-primary'>
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>

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

export default Profile;
