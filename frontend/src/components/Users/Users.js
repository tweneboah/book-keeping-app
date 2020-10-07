import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions/users/userActions';
import Loading from '../Loading/Loading';

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const usersList = useSelector(state => state.usersList);
  const { loading, users, error } = usersList;

  console.log(users, loading, error);
  return (
    <div className='container-fluid'>
      <h1 className='text-center m-5'>List of users {users && users.length}</h1>
      <hr className='text-white' />
      <div className='row text-center justify-content-center'>
        {loading ? (
          <Loading />
        ) : (
          <>
            {users &&
              users.map(user => (
                <div className='col-lg-3' key={user._id}>
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='card-title'>{user.name}</h5>
                      <p className='card-text'>{user.email}</p>
                      <i className='far fa-address-card h2 text-info'></i>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
