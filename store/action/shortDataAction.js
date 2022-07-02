import axios from 'axios';
import {
  INITALGET_DATA_PLAN,
  INITALGET_HIDE_PLAN,
  INITALGET_LOAD_PLAN,
} from '../redux/mainReducer';
export const getPlanes = () => {
  return async dispatch => {
    dispatch({
      type: INITALGET_LOAD_PLAN,
    });
    try {
      console.log('Loading planes...');
      const response = await axios.get(
        `https://ws-pay-qr.herokuapp.com/api/planes`,
      );
      const {data} = response;
      dispatch({
        type: INITALGET_DATA_PLAN,
        payload: data,
      });
    } catch (error) {
      console.error(error, 'WWWWWWWWWWWW');
    } finally {
      dispatch({
        type: INITALGET_HIDE_PLAN,
      });
    }
  };
};
