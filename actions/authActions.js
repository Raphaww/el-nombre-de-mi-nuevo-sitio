import { createTypes } from 'redux-action-types';
// import cookiesUtils from '../utils/cookies';

export const types = createTypes('auth',
   'GET_AUTH_TOKEN',
   'SET_TOKEN',
   'TOKEN_IS_REFRESING'
);

 const get = (token) => {
    return { type: types.GET_AUTH_TOKEN, token};
};

const loadToken = () => {
    return (dispatch) => {
        // const cookieAuthToken = cookiesUtils.load('_at') || '';
        dispatch(get(''));
    };
};

export default {loadToken};
