import Axios from 'axios';
import {BASE_URL} from '../../API';
import { INITAL_DATA_LOGIN, INITAL_HIDE_LOGIN, INITAL_LOAD_LOGIN } from '../redux/mainReducer';

export const loginAction = (email, password) => {
  return async dispatch => {
    dispatch({
      type: INITAL_LOAD_LOGIN,
    });
    try {
      const response = await Axios.post(
        `https://ws-pay-qr.herokuapp.com/api/users/login`,
        {
          email,
          password,
        },
      );
      const {data} = response;
      dispatch({
        type: INITAL_DATA_LOGIN,
        payload: data,
      });
    } catch (error) {
    } finally {
      dispatch({
        type: INITAL_HIDE_LOGIN,
      });
    }
  };
};
