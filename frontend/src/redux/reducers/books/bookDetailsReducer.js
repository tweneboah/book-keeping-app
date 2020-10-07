import {
  BOOK_DETAIL_FAIL,
  BOOK_DETAIL_REQUEST,
  BOOK_DETAIL_SUCCESS,
} from '../../actions/actionTypes';

const bookDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case BOOK_DETAIL_SUCCESS:
      return {
        book: action.payload,
        loading: false,
      };
    case BOOK_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookDetailReducer;
