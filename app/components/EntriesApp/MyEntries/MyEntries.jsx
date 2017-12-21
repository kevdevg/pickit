import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Entry from '../Entry/Entry';
import style from './style.scss';
import {isNil} from 'lodash/fp';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import {deleteEntry} from "../../../actions";

class MyEntries extends Component {

  static propTypes = {
    fetchMyEntries: PropTypes.func.isRequired,
    entriesData: ImmutablePropTypes.map.isRequired,
    usersData: ImmutablePropTypes.map.isRequired,
    deleteEntry: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {fetchMyEntries} = this.props;
    const token = this.props.usersData.get('token');
    if (!isNil(token)) {
      fetchMyEntries();
    }
  }

  handleDeleteEntry = (entry) => {
    const {deleteEntry} = this.props;
    deleteEntry(entry)
  };

  componentWillReceiveProps(nextProps) {
    const {fetchMyEntries} = this.props;
    const {entriesData} = nextProps;
    if (!entriesData.get('myEntriesLoading') && entriesData.get('refreshMyEntries')) {
      fetchMyEntries();
    }
  }


  render() {
    const myEntries = this.props.entriesData.get('myEntries');
    const isLoading = this.props.entriesData.get('myEntriesLoading');

    const entriesItems = myEntries.map(entry => (
      <Entry
        entry={entry}
        key={entry.get('id')}
        deleteEntry={this.handleDeleteEntry}
        userIsAuthenticated
        className={style.medium_entry}
      />
    )).toJS();

    return (
      <div>
        {isLoading ?
          <ProgressBar multicolor type="circular" mode="indeterminate"/>
          :
          <div className={style.row}>
            {entriesItems.length > 0 ? entriesItems : <h1>You don't have picked entries :(</h1>}
          </div>
        }
      </div>
    );
  }
}

export default MyEntries;
