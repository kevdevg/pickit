import React, {Component} from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Link from 'react-toolbox/lib/link';
import Navigation from 'react-toolbox/lib/navigation';
import {isNil} from 'lodash/fp';
import UserLoginForm from "../UsersApp/UserLoginForm/UserLoginForm";
import UserRegisterForm from "../UsersApp/UserRegisterForm/UserRegisterForm";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import style from './style.scss';

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
    const {loginUser} = this.props;
    loginUser(user);
  };

  handleRegisterUser = (user) => {
    const {registerUser} = this.props;
    registerUser(user);
  };

  handleLogoutUser = () => {
    const {logoutUser} = this.props;
    logoutUser();
  };

  render() {
    const token = this.props.usersData.get('token');
    console.log(token);
    return (
      <div className={style.row}>
        <Card className={style.banner}>
          <CardMedia
            aspectRatio="wide"
            image="http://www.ddn.com/wp-content/uploads/2013/08/customer_banner_nasa.png"
          />
        </Card>
        <AppBar className={style.nav} title="Pickit">
          {isNil(token) ? (
              <Navigation type="horizontal">
                <Link href="/" className={style.navigationLink} label="Home" icon="home"/>
                <Link href="/entries-nasa" className={style.navigationLink} label="Nasa API" icon="mms"/>
                <Link className={style.navigationLink} onClick={this.toggleLoginActive} label="Login" icon="inbox"/>
                <Link className={style.navigationLink} onClick={this.toggleRegisterActive} label="Register"
                      icon="person"/>
              </Navigation>
            )
            : (
              <Navigation>
                <Link href="/" className={style.navigationLink} label="Home" icon="inbox"/>
                <Link href="/entries-nasa" className={style.navigationLink} label="Nasa API" icon="mms"/>
                <Link href="/my-entries" className={style.navigationLink} label="My entries" icon="inbox"/>
                <Link className={style.navigationLink} onClick={this.handleLogoutUser} label="Logout" icon="inbox"/>
              </Navigation>
            )
          }
        </AppBar>
        {isNil(token) ? (
            <div>
              <UserLoginForm
                loginUser={this.handleLoginUser}
                active={this.state.loginActive}
                closeForm={this.toggleLoginActive}
                usersData={this.props.usersData}
              />
              <UserRegisterForm
                registerUser={this.handleRegisterUser}
                active={this.state.registerActive}
                closeForm={this.toggleRegisterActive}
                usersData={this.props.usersData}
              />
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
