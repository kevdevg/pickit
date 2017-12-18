import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import { isNil } from 'lodash/fp';
import Input from 'react-toolbox/lib/input';
import Dialog from 'react-toolbox/lib/dialog';

class UserLoginForm extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    closeForm: PropTypes.func.isRequired,
  };

  static userState = () => fromJS({
    username: '',
    password: '',
  });

  state = {
    userState : UserLoginForm.userState(),
  };

  handleChange = (key, value) => {
    const userState =  this.state.userState.set(key, value);
    this.setState({ userState });
  };


  handleLoginUser = () => {
    const { loginUser } =  this.props;
    loginUser(this.state.userState.toJS());
  };

  render() {
    const { active, closeForm } = this.props;
    const actions = [
      { label: "Cancel", onClick: closeForm },
      {
        label: "Login", onClick: this.handleLoginUser
      }
    ];
    return (
      <Dialog
        actions={actions}
        active={active}
        onEscKeyDown={closeForm}
        onOverlayClick={closeForm}
        title='Login'
      >
            <Input
              type='text'
              label='Username'
              value={this.state.userState.get('username')}
              onChange={this.handleChange.bind(this, 'username')}
            />
            <Input
              type='password'
              label='Email'
              value={this.state.userState.get('password')}
              onChange={this.handleChange.bind(this, 'password')}
            />
      </Dialog>
    )
  }
}

export default UserLoginForm;
