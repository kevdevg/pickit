import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions } from 'react-toolbox/lib/card';
import { IconButton } from 'react-toolbox/lib/button';

const Entry = ({ entry }) => (
  <Card>
    <CardMedia
      aspectRatio="wide"
      image={entry.get('image')}
    />
    <CardTitle
      title={entry.get('title')}
    />
    <CardText>{entry.get('description')}</CardText>
    <CardActions>
      <IconButton icon="favorite" accent={entry.get('pick')} />
    </CardActions>
    { entry.get('pick') ? (
      <div />

      )
    : (<div />

      )
    }
  </Card>
);

Entry.propTypes = {
  entry: ImmutablePropTypes.map.isRequired,
};

export default Entry;
