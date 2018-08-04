import { GET_EVENTS, PROFILE_LOADING } from "../actions/types";

const initialState = {
  events: [],
  loadingEvents: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
