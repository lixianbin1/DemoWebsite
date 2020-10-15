import {createStore} from 'redux';
import nameApp from './Reducer';

let store = createStore(nameApp, window.STATE_FROM_SERVER)

export default store