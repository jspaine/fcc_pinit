import React, {PropTypes} from 'react'
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card'
import {Button} from 'react-toolbox/lib/button'

import style from './UserCard.scss'

const UserCard = ({
  user,
  onUserClick,
  currUser,
  onDeleteClick,
  children
}) =>
  <Card className={style.card}>
    <CardTitle
      onClick={onUserClick}
      className={style.cardTitle}
      avatar={user.image}
      title={user.username}
      subtitle={user.email}
    />
    <CardText>
      {children}
    </CardText>
    <CardActions>
      {(currUser && currUser.role === 'admin') &&
        <Button onClick={onDeleteClick}>Delete</Button>
      }
    </CardActions>
  </Card>

export default UserCard
