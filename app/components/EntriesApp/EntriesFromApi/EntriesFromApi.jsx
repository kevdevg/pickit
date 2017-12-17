import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from 'react-toolbox/lib/input';
import Entry from '../Entry/Entry';

class EntriesFromApi extends Component {

  static propTypes = {
    fetchEntrances: PropTypes.func.isRequired,
    entriesData: ImmutablePropTypes.map.isRequired,
  };

  state = {
    query: '',
  };

  handleChangeQuery = (query) => {
    this.setState({ query });
    console.log(query);
  };

  render() {
    console.log(this.props);
    const entries = this.props.entriesData.get('entries');

    const entriesItems = entries.map(entry => (
      <Entry
        entry={entry}
      />
    )).toJS();

    return (
      <div>
        <Input type="text" label="Parametro de busqueda" value={this.state.name} onChange={this.handleChangeQuery()} />

        <div>
          {entriesItems}
        </div>
      </div>
    );
  }

}

export default EntriesFromApi;
