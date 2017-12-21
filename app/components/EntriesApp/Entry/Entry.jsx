import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions
} from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';

const TooltipButton = Tooltip(Button);
import PropTypes from "prop-types";

class Entry extends Component {

  handleToggleEntry = () => {
    const { saveEntry, entry, deleteEntry } = this.props;
    entry.get('pick') ?
      deleteEntry(entry.toJS()) :
      saveEntry(entry.toJS())
  };

  render(){
    const { userIsAuthenticated, entry, className } = this.props;

    return (
      <Card className={className}>
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
              <TooltipButton
                icon='favorite'
                accent={entry.get('pick')}
                tooltip={entry.get('pick') ? 'Tap to delete' : 'Tap to save'}
                onClick={this.handleToggleEntry}
              />
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
  deleteEntry: PropTypes.func,
  userIsAuthenticated: PropTypes.bool,
};

export default Entry;
