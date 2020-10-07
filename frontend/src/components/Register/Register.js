import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Register.css';
import { registerUser } from '../../redux/actions/users/userActions';
import Loading from '../Loading/Loading';
import ErrorMessage from '../DisplayMessage/ErrorMessage';

const Register = ({ history }) => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  //dispatch
  const dispatch = useDispatch();
  //submit
  const formSubmitHandler = e => {
    e.preventDefault();
    dispatch(registerUser(name, email, password));
    console.log(userInfo, loading, error);
    if (userInfo !== null && error === undefined) history.push('/');
  };

  return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          {loading && <Loading />}
          {error && <ErrorMessage error={error} />}
          <h1 className='text-center'>Register</h1>

          <form onSubmit={formSubmitHandler}>
            <fieldset>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Name</label>
                <input
                  value={name}
                  onChange={e => setname(e.target.value)}
                  type='text'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter Name'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Email address</label>
                <input
                  value={email}
                  onChange={e => setemail(e.target.value)}
                  type='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input
                  value={password}
                  onChange={e => setpassword(e.target.value)}
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Password'
                />
              </div>
              <button type='submit' className='btn btn-info m-auto'>
                Register
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
