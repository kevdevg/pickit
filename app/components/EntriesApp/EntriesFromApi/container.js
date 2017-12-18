import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EntrancesFromApi from './EntriesFromApi';
import { fetchEntries } from '../../../actions';

const mapStateToProps = (state) => ({
  entriesData: state.entriesData,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchEntries,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EntrancesFromApi);
