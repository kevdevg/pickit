import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Entry from '../Entry/Entry';
import style from './style.scss';

class MyEntries extends Component {

  static propTypes = {
    fetchMyEntries: PropTypes.func.isRequired,
    entriesData: ImmutablePropTypes.map.isRequired,
  };

  fetchMyEntries = () => {
    const { fetchMyEntries } = this.props;
    fetchMyEntries(this.state.query);
  };

  render() {
    const my_entries = this.props.entriesData.get('my_entries');

    const entriesItems = my_entries.map(entry => (
      <Entry
        entry={entry}
      />
    )).toJS();

    return (
      <div>
        <div className={style.row}>
          {entriesItems}
        </div>
      </div>
    );
  }

}

export default MyEntries;
