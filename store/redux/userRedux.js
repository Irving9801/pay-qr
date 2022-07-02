import produce from "immer";
import {
  INITAL_LOAD_LOGIN,
  INITAL_DATA_LOGIN,
  INITAL_HIDE_LOGIN,
} from './mainReducer';
const initialState = {
  loading: false,
  userInfo: [],
};
export const userLoginReducer = (state = initialState, action) => 
  produce(state, (draft) => {
  switch (action.type) {
    case INITAL_LOAD_LOGIN:
      draft.loading=true;
      break
    case INITAL_DATA_LOGIN:
      draft.userInfo=action.payload;
      break;
    case INITAL_HIDE_LOGIN:
      draft.loading=false;
      break;
    default:
      return state;
  }
});
