import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions
} from 'react-toolbox/lib/card';
import {IconButton} from 'react-toolbox/lib/button';
import style from './style.scss';
import PropTypes from "prop-types";

class Entry extends Component {

  handleSaveEntry = () => {
    const { saveEntry, entry } = this.props;
    saveEntry(entry.toJS());
  };

  render(){
    const { userIsAuthenticated, entry } = this.props;

    return (
      <Card className={style.entry}>
        <CardMedia
          aspectRatio="wide"
          image={entry.get('image')}
        />
        <CardTitle
          title={entry.get('title')}
        />
        <CardText>{entry.get('description')}</CardText>
        {userIsAuthenticated ? (
            <CardActions>
              <IconButton onClick={this.handleSaveEntry} icon="favorite" accent={entry.get('pick')}/>
            </CardActions>
          )
          : (
            <div/>
          )
        }
      </Card>
    )
  }
}

Entry.propTypes = {
  entry: ImmutablePropTypes.map.isRequired,
  saveEntry: PropTypes.func,
  userIsAuthenticated: PropTypes.bool,
};

export default Entry;
