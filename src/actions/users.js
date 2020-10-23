import {
  GET_USERS,
  GET_USER_BY_ID,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_MESSAGE,
} from "../actions/types";

import AllUsersService from "../services/all-users.service";

//////////////////////////////////////////////////////////////Get users
export const getUsers = () => (dispatch) => {
  return AllUsersService.getAllUsers().then(
    (users) => {
      dispatch({
        type: GET_USERS,
        payload: users,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

//////////////////////////////////////////////////////////////Get users by id
export const getUsersById = (userId) => (dispatch) => {
  return AllUsersService.getUserById(userId).then(
    (user) => {
      dispatch({
        type: GET_USER_BY_ID,
        payload: user,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

////////////////////////////////////////////////////////////////////////////////Create User
export const createNewUser = (username, email, password) => (dispatch) => {
  return AllUsersService.createNewUser(username, email, password).then(
    (response) => {
      dispatch({
        type: ADD_USER,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

////////////////////////////////////////////////////////////////////////////////Create User
export const updateUser = (username, email, password, userId) => (dispatch) => {
  return AllUsersService.updateUser(username, email, password, userId).then(
    (response) => {
      dispatch({
        type: UPDATE_USER,
        payload: response,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
