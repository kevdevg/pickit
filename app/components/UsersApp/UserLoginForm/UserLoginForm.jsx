import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import { isNil } from 'lodash/fp';
import Input from 'react-toolbox/lib/input';
import Dialog from 'react-toolbox/lib/dialog';
import ProgressBar from 'react-toolbox/lib/progress_bar';

class UserLoginForm extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    usersData: ImmutablePropTypes.map.isRequired,
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
    const { active, closeForm, usersData} = this.props;
    const actions = [
      { label: "Cancel", onClick: closeForm },
      {
        label: "Login", onClick: this.handleLoginUser
      }
    ];
    const isLoading = usersData.get('userLoading');
    return (
      <Dialog
        actions={actions}
        active={active}
        onEscKeyDown={closeForm}
        onOverlayClick={closeForm}
        title='Login'
      >
        {
          isLoading ?
            <ProgressBar multicolor type="circular" mode="indeterminate" />
            :
            <div>
              <Input
                type='text'
                label='Username'
                value={this.state.userState.get('username')}
                onChange={this.handleChange.bind(this, 'username')}
              />
              <Input
                type='password'
                label='Password'
                value={this.state.userState.get('password')}
                onChange={this.handleChange.bind(this, 'password')}
              />
            </div>
        }
      </Dialog>
    )
  }
}

export default UserLoginForm;
