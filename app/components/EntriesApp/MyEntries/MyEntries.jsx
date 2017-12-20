import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Entry from '../Entry/Entry';
import style from './style.scss';
import {isNil} from 'lodash/fp';

class MyEntries extends Component {

  static propTypes = {
    fetchMyEntries: PropTypes.func.isRequired,
    entriesData: ImmutablePropTypes.map.isRequired,
    usersData: ImmutablePropTypes.map.isRequired,
  };

  componentDidMount() {
    const { fetchMyEntries } = this.props;
    const token = this.props.usersData.get('token');
    if (!isNil(token)) {
      fetchMyEntries();
    }
  }

  render() {
    const myEntries = this.props.entriesData.get('myEntries');
    const entriesItems = myEntries.map(entry => (
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
