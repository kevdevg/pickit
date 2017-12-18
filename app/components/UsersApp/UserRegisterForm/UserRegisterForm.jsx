import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import { isNil } from 'lodash/fp';
import Input from 'react-toolbox/lib/input';
import Dialog from 'react-toolbox/lib/dialog';

class UserRegisterForm extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    closeForm: PropTypes.func.isRequired,
  };

  static userState = () => fromJS({
    username: '',
    password1: '',
    password2: '',
    email: '',
  });

  state = {
    userState : UserRegisterForm.userState(),
  };

  handleChange = (key, value) => {
    const userState =  this.state.userState.set(key, value);
    this.setState({ userState });
  };


  handleRegisterUser = () => {
    const { registerUser } =  this.props;
    registerUser(this.state.userState.toJS());
  };

  render() {
    const { active, closeForm } = this.props;
    const actions = [
      { label: "Cancel", onClick: closeForm },
      {
        label: "Register", onClick: this.handleRegisterUser
      }
    ];
    return (
      <Dialog
        actions={actions}
        active={active}
        onEscKeyDown={closeForm}
        onOverlayClick={closeForm}
        title='Register'
      >
        <Input
          type='text'
          label='Username'
          value={this.state.userState.get('username')}
          onChange={this.handleChange.bind(this, 'username')}
        />
        <Input
          type='password'
          label='Password'
          value={this.state.userState.get('password1')}
          onChange={this.handleChange.bind(this, 'password1')}
        />
        <Input
          type='password'
          label='Password confirm'
          value={this.state.userState.get('password2')}
          onChange={this.handleChange.bind(this, 'password2')}
        />
        <Input
          type='email'
          label='Email'
          value={this.state.userState.get('email')}
          onChange={this.handleChange.bind(this, 'email')}
        />
      </Dialog>
    )
  }
}

export default UserRegisterForm;
