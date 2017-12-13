import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions } from 'react-toolbox/lib/card';
import { IconButton } from 'react-toolbox/lib/button';

const Entrance = ({ entrance }) => (
  <Card>
    <CardMedia
      aspectRatio="wide"
      image={entrance.get('image')}
    />
    <CardTitle
      title={entrance.get('title')}
    />
    <CardText>{entrance.get('description')}</CardText>
    <CardActions>
      <IconButton icon="favorite" accent={entrance.get('pick')} />
    </CardActions>
    { entrance.get('pick') ? (
      <div />

      )
    : (<div />

      )
    }
  </Card>
);

Entrance.propTypes = {
  entrance: ImmutablePropTypes.map.isRequired,
};

export default Entrance;
