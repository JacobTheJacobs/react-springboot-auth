import React, { Component } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import AllUsersService from "../services/all-users.service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      listOfUsers: [],
    };
  }

  componentDidMount() {
    AllUsersService.getAllUsers().then(
      (response) => {
        const tempListOfUsers = [];
        response.data.forEach((res) => {
          console.log(res);
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

  deleteUser = (id) => {
    AllUsersService.deleteUser(id);
    window.location.reload();
  };

  updateUser = () => {};

  render() {
    let { listOfUsers } = this.state;
    return (
      <div className="container">
        <br></br>
        <h3>{this.state.content}</h3>
        <Link
          to={"/add"}
          className="navbar-brand"
          className="alert alert-success"
        >
          Add new Voter
        </Link>
        <br></br>
        <br></br>
        <table className="table table-striped">
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
                  <button
                    onClick={() => this.deleteUser(user.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>{" "}
                  <Link to={`/users/${user.id}`} className="btn btn-warning">
                    Update{" "}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
