import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Button} from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Entry from '../Entry/Entry';
import style from './style.scss';
import {isNil} from 'lodash/fp';
import ProgressBar from 'react-toolbox/lib/progress_bar';


class EntriesFromApi extends Component {

  static propTypes = {
    fetchEntries: PropTypes.func.isRequired,
    entriesData: ImmutablePropTypes.map.isRequired,
    saveEntry: PropTypes.func.isRequired,
    deleteEntry: PropTypes.func.isRequired,
    usersData: ImmutablePropTypes.map.isRequired,
  };

  state = {
    query: '',
  };

  onChangeQuery = (value) => {
    this.setState({query: value});
  };

  fetchEntries = () => {
    const {fetchEntries} = this.props;
    fetchEntries(this.state.query);
  };

  saveEntry = (entry) => {
    const {saveEntry} = this.props;
    saveEntry(entry)
  };

  handleDeleteEntry = (entry) => {
    const {deleteEntry} = this.props;
    deleteEntry(entry)
  };


  componentWillReceiveProps(nextProps) {
    const {entriesData} = nextProps;
    if (!entriesData.get('entriesLoading') && entriesData.get('refresh')) {
      this.fetchEntries();
    }
  }


  render() {
    const entries = this.props.entriesData.get('entries');
    const token = this.props.usersData.get('token');
    const userIsAuthenticated = !isNil(token);
    const isLoading = this.props.entriesData.get('entriesLoading');
    const entriesItems = entries.map(entry => (
      <Entry
        entry={entry}
        key={entry.get('nasa_id')}
        saveEntry={this.saveEntry}
        deleteEntry={this.handleDeleteEntry}
        userIsAuthenticated={userIsAuthenticated}
        className={style.medium_entry}
      />
    )).toJS();

    return (
      isLoading ?
        <ProgressBar multicolor type="circular" mode="indeterminate"/>
        :
        <div>
          <h1>Type something and press search :) </h1>
          <div className={style.row}>
            <Input className={style.search_input} type="text" label="Parametro de busqueda" value={this.state.query}
                   onChange={this.onChangeQuery}/>
            <Button icon="search" label="Search" flat onClick={this.fetchEntries}
                    disabled={this.state.query.length < 3}/>
          </div>
          <div className={style.row}>
            {entriesItems}
          </div>
        </div>
    );
  }

}

export default EntriesFromApi;
