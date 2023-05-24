import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: ''
    };
  }

  handleOnChangeInput = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {

    this.setState({
      errMessage: ''
    })
    try{
      await handleLoginApi(this.state.username, this.state.password);
    }catch(error){
      console.log(error );
      // if(error.respone){
      //   if(error.respone.data){
      //     this.setState({
      //                 errMessage: error.respone.data.message
      //               })
      //   }
      // }
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login-backround">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login mt-4">Login</div>
            <div className="col-12 input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your usename"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
            <div className="col-12 input">
              <label>Password:</label>
              <div className="custom">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={(event) => this.handleOnChangePassword(event)}
                />
                <span onClick={(event) => this.handleShowHidePassword(event)}>
                  <i
                    class={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 " >
              {this.state.errMessage}
            </div>
            <div className="col-12 ">
              <button
                className="login-btn"
                onClick={(event) => this.handleLogin(event)}
              >
                Login
              </button>
            </div>

            <div className="col-12 input">
              <span>Forgot your password</span>
            </div>
            <div className="col-12 input-or mt-3">Or login with</div>
            <div className="col-12 social-login">
              <i class="fab fa-google-plus-g google"></i>
              <i class="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
