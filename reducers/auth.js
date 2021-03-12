import { types } from '../actions/authActions';
import initialState from './initialState';

export default function authReducer(state = initialState.authToken, action) {
   switch (action.type) {
      case types.GET_AUTH_TOKEN:
         return { token: action.token, isRefreshing: false };
      case types.SET_TOKEN:
         return Object.assign({}, state, { token: action.token, isRefreshing: false });
      case types.TOKEN_IS_REFRESING:
         return Object.assign({}, state, { token: '', isRefreshing: true });
      default:
         return state;
   }
}