import produce from 'immer';
import {
  INITALGET_LOAD_PLAN,
  INITALGET_DATA_PLAN,
  INITALGET_HIDE_PLAN,
  PROFILE_DATA,
  SELECTED_PLANE,
} from './mainReducer';
const initialState = {
  loading: false,
  userGetPlan: [],
  profileData:[],
  selectedData: []
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
      case PROFILE_DATA:
        draft.profileData = action.payload;
        break; 
        case SELECTED_PLANE:
        draft.selectedData = action.payload;
        break;
      default:
        return state;
    }
  });
