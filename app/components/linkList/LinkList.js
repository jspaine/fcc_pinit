import React, {PropTypes} from 'react'

import {LinkCard} from 'components'
// import style from './UserCard.scss'

const LinkList = ({
  user,
  users,
  links,
  deleteLink,
  starLink,
  push
}) =>
  <ul style={{
    display: 'flex',
    margin: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }}>
    {links.map(link =>
      <LinkCard
        key={link._id}
        user={user}
        users={users}
        link={link}
        deleteLink={deleteLink}
        starLink={starLink}
        push={push}
      />
    )}
  </ul>

export default LinkList
