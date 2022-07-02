import {createStore, applyMiddleware, combineReducers} from 'redux';
import {userLoginReducer} from './../store/redux/userRedux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import {getDataPlanReducer} from '../store/redux/shortDataRedux';
const reducer = combineReducers({
  userReducer: userLoginReducer,
  getPlane: getDataPlanReducer,
});

const initialState = {
  // cart: {
  //   cartItems: cartItemsFromStorage,
  //   shippingAddress: shippingAddressFromStorage,
  // },
  // login: {isAuthenticate: false},
};

const middleware = [thunk];
if ('qa' !== 'prod') middleware.push(logger);
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
