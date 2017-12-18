import React, {Component} from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Link from 'react-toolbox/lib/link';
import Navigation from 'react-toolbox/lib/navigation';
import {isNil} from 'lodash/fp';
import UserLoginForm from "../UsersApp/UserLoginForm/UserLoginForm";
import UserRegisterForm from "../UsersApp/UserRegisterForm/UserRegisterForm";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";

class Nav extends Component {

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    usersData: ImmutablePropTypes.map.isRequired,
  };

  state = {
    registerActive: false,
    loginActive: false,
  };

  toggleRegisterActive = () => {
    this.setState({registerActive: !this.state.registerActive})
  };

  toggleLoginActive = () => {
    this.setState({loginActive: !this.state.loginActive})
  };

  handleLoginUser = (user) => {
    const { loginUser } = this.props;
    loginUser(user);
  };

  handleRegisterUser = (user) => {
    const { registerUser } = this.props;
    registerUser(user);
  };

  handleLogoutUser = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  render() {
    const token = this.props.usersData.get('token');
    return (
      <div>
        <AppBar title="Pickit">
          {isNil(token) ? (
              <Navigation type="horizontal">
                <Link onClick={this.toggleLoginActive} label="Login" icon="inbox"/>
                <Link onClick={this.toggleRegisterActive} active label="Register" icon="person"/>
              </Navigation>
            )
            : (
              <Navigation>
                <Link label="My entries" icon="inbox"/>
                <Link onClick={this.handleLogoutUser} label="Logout" icon="inbox"/>
              </Navigation>
            )
          }
        </AppBar>
        {isNil(token) ? (
            <div>
              <UserLoginForm
                loginUser={this.handleLoginUser}
                active={this.state.loginActive}
                closeForm={this.toggleLoginActive}/>
              <UserRegisterForm
                registerUser={this.handleRegisterUser}
                active={this.state.registerActive}
                closeForm={this.toggleRegisterActive}/>
            </div>
          )
          : (
            <div/>
          )
        }

      </div>

    )
  };
}

export default Nav;
