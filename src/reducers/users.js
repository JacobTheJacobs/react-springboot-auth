import {
  GET_USERS,
  GET_USER_BY_ID,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../actions/types";

const initialState = {
  users: [],
  user: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        user: payload,
      };
    case ADD_USER:
      return {
        ...state,
        user: payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
      };
    case DELETE_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
