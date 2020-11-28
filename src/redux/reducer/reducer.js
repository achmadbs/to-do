import { FETCHING_DATA, FETCHING_DONE } from '../constant';

const initialState = {
  isLoading: false,
  data: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, data } = action;
  switch (type) {
    case FETCHING_DATA:
      return { ...state, isLoading };
    case FETCHING_DONE:
      return { ...state, isLoading, data };
    default:
      return state;
  }
}
