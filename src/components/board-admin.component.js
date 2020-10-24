import React, { Component } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import AllUsersService from "../services/all-users.service";
import { connect } from "react-redux";
import { getUsers } from "../actions/users";

class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      listOfUsers: [],
      sortingOrder: "DESC",
      selected: {},
      selectAll: 0,
    };
  }

  sortBy(sortedKey) {
    const data = this.state.listOfUsers;
    let sortingOrder = this.state.sortingOrder;

    if (sortedKey === "id") {
      if (sortingOrder === "ASC") {
        sortingOrder = "DESC";
        data.sort((a, b) => b.id - a.id);
      } else {
        sortingOrder = "ASC";
        data.sort((a, b) => a.id - b.id);
      }
      return this.setState({ data, sortingOrder });
    }

    if (sortingOrder === "ASC") {
      sortingOrder = "DESC";
      data.sort((a, b) => b[sortedKey].localeCompare(a[sortedKey]));
    } else {
      sortingOrder = "ASC";
      data.sort((a, b) => a[sortedKey].localeCompare(b[sortedKey]));
    }
    this.setState({ data, sortingOrder });
  }

  toggleRow(id) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[id] = !this.state.selected[id];
    this.setState({
      selected: newSelected,
      selectAll: 2,
    });
    console.log(this.state.selectAll);
  }

  toggleSelectAll() {
    let newSelected = {};
    if (this.state.selectAll === 0) {
      this.state.listOfUsers.forEach((x) => {
        newSelected[x.id] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0,
    });
    console.log(newSelected);
    console.log(this.state.selectAll);
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
    let numberofObjects = Object.keys(this.state.selected).length;
    let objKeys = Object.keys(this.state.selected);
    if (numberofObjects === 0) {
      AllUsersService.deleteUser(id);
    } else {
      for (var i = 0; i < numberofObjects; i++) {
        objKeys.forEach((key) => {
          AllUsersService.deleteUser(key);
        });
      }
    }

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
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col-sm">
                  {" "}
                  <input
                    type="checkbox"
                    className="checkbox"
                    aria-label="Checkbox for following text input"
                    checked={this.state.selectAll === 1}
                    ref={(input) => {
                      if (input) {
                        input.indeterminate = this.state.selectAll === 2;
                      }
                    }}
                    onChange={() => this.toggleSelectAll()}
                  />
                </th>
                <th
                  scope="col-sm"
                  onClick={() => this.sortBy("id")}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  ID
                </th>
                <th
                  scope="col-sm"
                  onClick={() => this.sortBy("username")}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Username
                </th>
                <th
                  scope="col-sm"
                  onClick={() => this.sortBy("email")}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Email
                </th>
                <th scope="col-sm"> Actions</th>
              </tr>
            </thead>
            <tbody>
              {listOfUsers.map((user, _) => (
                <tr key={user.id}>
                  <td>
                    {" "}
                    <input
                      type="checkbox"
                      className="checkbox"
                      aria-label="Checkbox for following text input"
                      checked={this.state.selected[user.id] === true}
                      onChange={() => this.toggleRow(user.id)}
                    />
                  </td>
                  <th scope="row">{user.id}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this item?"
                          )
                        )
                          this.deleteUser(user.id);
                      }}
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
      </div>
    );
  }
}

export default BoardAdmin;
