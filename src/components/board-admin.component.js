import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      listOfUsers: [],
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      (response) => {
        const tempListOfUsers = [];
        response.data.forEach((res) => {
          tempListOfUsers.push(res);
        });
        this.setState({
          listOfUsers: tempListOfUsers,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    let { listOfUsers } = this.state;
    return (
      <div className="container">
        <h3>{this.state.content}</h3>
        <button>Add new Voter</button>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col-sm">#</th>
              <th scope="col-sm">Username</th>
              <th scope="col-sm">Email</th>
              <th scope="col-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listOfUsers.map((user, _) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button>Delete</button> <button>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
