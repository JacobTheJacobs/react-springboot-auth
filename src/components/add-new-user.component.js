import React, { Component } from "react";
import { Link } from "react-router-dom";

import AllUsersService from "../services/all-users.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  saveUser = () => {
    const { username, email, password } = this.state;
    console.log(username, email, password);
    this.setState({
      loading: true,
    });
    AllUsersService.createNewUser(username, email, password);
    window.location.reload();
  };

  render() {
    const { username, email, password, loading } = this.state;
    return (
      <div>
        {loading === false ? (
          <div className="container jumbotron">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">User Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="exampleName1"
                  aria-describedby="emailHelp"
                  value={username}
                  onChange={(username) => this.onChangeUsername(username)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(email) => this.onChangeEmail(email)}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(password) => this.onChangePassword(password)}
                />
              </div>

              <div onClick={this.saveUser} className="btn btn-success">
                Save
              </div>
              <span> </span>
              <Link
                to={"/admin"}
                className="btn btn-primary"
                style={{ float: "right" }}
              >
                Go Back
              </Link>
            </form>
          </div>
        ) : (
          <img src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif" />
        )}
      </div>
    );
  }
}
