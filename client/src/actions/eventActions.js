import axios from "axios";

import { GET_ERRORS, CLEAR_ERRORS, GET_EVENTS, EVENT_LOADING } from "./types";

// Get Events
export const getEvents = () => dispatch => {
  dispatch(setEventsLoading());
  axios
    .get("/api/events")
    .then(res =>
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENTS,
        payload: null
      })
    );
};
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
// Events loading
export const setEventsLoading = () => {
  return {
    type: EVENT_LOADING
  };
};
