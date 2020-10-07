import {
  CREATE_BOOK_FAIL,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
} from '../../actions/actionTypes';

const createdBookReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOOK_REQUEST:
      return {
        loading: true,
      };
    case CREATE_BOOK_SUCCESS:
      return {
        book: action.payload,
        loading: false,
      };
    case CREATE_BOOK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createdBookReducer;
