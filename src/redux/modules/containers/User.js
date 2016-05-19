import {handleActions} from 'redux-actions';
import _ from "lodash";


export const LOAD_USER = 'bumo/painting/LOAD_USER';
export const LOAD_USER_SUCCESS = 'bumo/painting/LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'bumo/painting/LOAD_USER_FAIL';



export function loadUser(index) {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: (client) => client.get('/api/profiles/hot?page=' + index),
    normalizeSchema: 'profile'
  };
}

const initialState = {
  pageMeta: {
    current: 0,
    next: 1,
  },
  indexes: [],
  loaded: false,
  loading: false,
};

export default handleActions({
  [LOAD_USER]: (state, action) => ({
    ...state,
    loading: true
  }),
  [LOAD_USER_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    loading: false,
    pageMeta: action.result,
    indexes: _.uniq([...state.indexes, ...action.normalized.result])
  }),
  ['@@router/LOCATION_CHANGE']: (state, action) => (initialState)
}, initialState);
