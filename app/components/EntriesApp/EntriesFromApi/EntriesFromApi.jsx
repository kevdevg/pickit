import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from 'react-toolbox/lib/input';
import Entry from '../Entry/Entry';
import style from './style.scss';
import {isNil} from 'lodash/fp';

class EntriesFromApi extends Component {

  static propTypes = {
    fetchEntries: PropTypes.func.isRequired,
    entriesData: ImmutablePropTypes.map.isRequired,
    saveEntry: PropTypes.func.isRequired,
    usersData: ImmutablePropTypes.map.isRequired,
  };

  state = {
    query: '',
  };

  onChangeQuery = (value) => {
    this.setState({query: value}, () => {
      this.fetchEntries();
    });
  };

  fetchEntries = () => {
    const {fetchEntries} = this.props;
    fetchEntries(this.state.query);
  };

  saveEntry = (entry) => {
    const {saveEntry} = this.props;
    saveEntry(entry)
  };

  render() {
    const entries = this.props.entriesData.get('entries');
    const token = this.props.usersData.get('token');
    const userIsAuthenticated = !isNil(token);
    const entriesItems = entries.map(entry => (
      <Entry
        entry={entry}
        saveEntry={this.saveEntry}
        userIsAuthenticated={userIsAuthenticated}
      />
    )).toJS();

    return (
      <div>
        <Input type="text" label="Parametro de busqueda" value={this.state.query} onChange={this.onChangeQuery}/>

        <div className={style.row}>
          {entriesItems}
        </div>
      </div>
    );
  }

}

export default EntriesFromApi;
