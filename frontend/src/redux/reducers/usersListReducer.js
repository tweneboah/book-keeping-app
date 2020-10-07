import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
} from '../actions/actionTypes';

const usersListReducer = (state = [], action) => {
  switch (action.type) {
    // Register
    case FETCH_USERS_REQUEST:
      return { loading: true };
    case FETCH_USERS_SUCCESS:
      return {
        users: action.payload,
      };
    case FETCH_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default usersListReducer;
