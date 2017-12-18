import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from 'react-toolbox/lib/input';
import Entry from '../Entry/Entry';
import style from './style.scss';

class EntriesFromApi extends Component {

  static propTypes = {
    fetchEntries: PropTypes.func.isRequired,
    entriesData: ImmutablePropTypes.map.isRequired,
  };

  state = {
    query: '',
  };

  onChangeQuery = (value) => {
    this.setState({ query: value }, () => {
      this.fetchEntries();
    });
  };

  fetchEntries = () => {
    const { fetchEntries } = this.props;
    fetchEntries(this.state.query);
  };

  render() {
    const entries = this.props.entriesData.get('entries');

    const entriesItems = entries.map(entry => (
      <Entry
        entry={entry}
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
