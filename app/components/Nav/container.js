import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from './Nav';
import {
  registerUser,
  loginUser,
  logoutUser
} from '../../actions';

const mapStateToProps = (state) => ({
  usersData: state.usersData,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    registerUser, loginUser, logoutUser
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
