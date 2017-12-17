import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchEntrances} from '../../../actions';
import EntrancesFromApi from './EntriesFromApi';

const mapStateToProps = (state) => ({
  entriesData: state.entriesData,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchEntrances,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EntrancesFromApi);
