import produce from 'immer';
import {
  INITALGET_LOAD_PLAN,
  INITALGET_DATA_PLAN,
  INITALGET_HIDE_PLAN,
} from './mainReducer';
const initialState = {
  loading: false,
  userGetPlan: [],
};
export const getDataPlanReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INITALGET_LOAD_PLAN:
        draft.loadingPlan = true;
        break;
      case INITALGET_DATA_PLAN:
        draft.userGetPlan = action.payload;
        break;
      case INITALGET_HIDE_PLAN:
        draft.loadingPlan = false;
        break;
      default:
        return state;
    }
  });
