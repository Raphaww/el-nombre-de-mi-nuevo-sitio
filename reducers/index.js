import { combineReducers } from "redux";
import {reducer as formReducer} from 'redux-form';
import hotelBookerRates from '@revenatium/revenatium-booker/dist/reducers/hotelBookerRatesReducer';
import authToken from './auth';

export default combineReducers({
   form: formReducer,
   hotelBookerRates,
   authToken
});