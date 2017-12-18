import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EntrancesFromApi from './EntriesFromApi';
import { fetchEntries, saveEntry } from '../../../actions';

const mapStateToProps = (state) => ({
  entriesData: state.entriesData,
  usersData: state.usersData,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchEntries, saveEntry
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EntrancesFromApi);
