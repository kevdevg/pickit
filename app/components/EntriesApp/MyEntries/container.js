import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyEntries from './MyEntries';
import { fetchMyEntries, deleteEntry } from '../../../actions';

const mapStateToProps = (state) => ({
  entriesData: state.entriesData,
  usersData: state.usersData,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchMyEntries, deleteEntry
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(MyEntries);
