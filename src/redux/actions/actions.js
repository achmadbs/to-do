import { FETCHING_DONE, FETCHING_DATA } from '../constant';
import axios from 'axios';

export const requestAPI = () => {
  return async function (dispatch) {
    try {
      dispatch({ type: FETCHING_DATA, isLoading: true });
      const { data } = await axios.get('https://api.kanye.rest');
      dispatch({ type: FETCHING_DONE, isLoading: false, data });
    } catch (err) {
      console.log(err);
      dispatch({ type: FETCHING_DONE, isLoading: false });
    }
  };
};
