import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://dev.stylingbig.com/api/test/users";

class AllUsersService {
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getUserById(userId) {
    return axios.get(API_URL + "/" + userId, { headers: authHeader() });
  }

  createNewUser(username, email, password) {
    return axios.post(
      API_URL,
      {
        username,
        email,
        password,
      },
      { headers: authHeader() }
    );
  }

  deleteUser(userId) {
    return axios.delete(API_URL + "/" + userId, { headers: authHeader() });
  }

  updateUser(username, email, password, userId) {
    console.log(username, email, password, userId);
    return axios.put(
      API_URL + "/" + userId,
      {
        username,
        email,
        password,
      },
      { headers: authHeader() }
    );
  }
}

export default new AllUsersService();
