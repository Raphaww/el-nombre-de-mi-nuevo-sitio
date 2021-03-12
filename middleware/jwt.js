import { types } from '../actions/authActions';
import authUtils from '../utils/auth';
import apiUtils from '../utils/api';
//import cookiesUtils from '../utils/cookies';

const { SET_TOKEN, TOKEN_IS_REFRESING } = types;

function callApi(action, next, dispatch, getState) {
   let { endpoint, types, method, body, params } = action['CALL_API'];
   const language = 'es-mx';
   if (!authUtils.isValidAccessToken(getState().authToken.token)) {
      dispatch({ type: TOKEN_IS_REFRESING });
      return apiUtils.renewAccessToken()
         .then((response) => {
            // cookiesUtils.save('_at', response.data.access_token);
            dispatch({ type: SET_TOKEN, token: response.data.access_token });
            return apiUtils.call(endpoint, types, method, body, params, response.data.access_token, language);
         });
   } else {
      return apiUtils.call(endpoint, types, method, body, params, getState().authToken.token, language);
   }
}

function jwt({ dispatch, getState }) {
   return (next) => (action) => {
      const callAPI = action['CALL_API'];
      if (typeof callAPI === 'undefined') {
         return next(action);
      }
      return callApi(action, next, dispatch, getState);
   };
}

export default { jwt };
