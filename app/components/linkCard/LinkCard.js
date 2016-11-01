import React, {PropTypes} from 'react'
import {Card, CardTitle, CardMedia, CardText, CardActions} from 'react-toolbox/lib/card'
import {FontIcon} from 'react-toolbox/lib/font_icon'
import {Button} from 'react-toolbox/lib/button'
import {Link} from 'react-toolbox/lib/link'
import moment from 'moment'

// import style from './UserCard.scss'

const LinkCard = ({
  user,
  users,
  link,
  deleteLink,
  starLink,
  push
}) => {
  const hasStarred = user && link.stars.find(star => star.user === user._id)
  const author = user && users.find(u => u._id === user._id)
  const owns = author && author.links.find(l => l._id === link._id)
  return (
    <Card
      style={{
        width: '250px',
        margin: '1rem',
        flexShrink: 1
      }}
    >
      <CardMedia aspectRatio="square">
        <img
          onError={addDefaultSrc}
          src={link.url}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            maxHeight: '150%',
            maxWidth: '150%'
          }}
        />
      </CardMedia>
      <CardTitle
        avatar={link.avatar}
        title={link.description}
      >
        <Link
          href={`/users/${link.userId}`}
          label={link.username}
          onClick={ev => {
            ev.preventDefault()
            push(`/users/${link.userId}`)
          }}
          style={{
            justifyContent: 'flex-start'
          }}
        />
      </CardTitle>
      <CardActions style={{
        justifyContent: 'space-between'
      }}>
        <div>
          {user ?
            <FontIcon
              value="favorite"
              onClick={() => starLink(link._id)}
              style={{
                color: hasStarred ? 'red' : 'black',
                cursor: 'pointer'
              }}
            /> :
            <FontIcon value="favorite" style={{
              color: 'blue'
            }}/>
          }
          {link.stars.length}
        </div>
        {user && owns &&
          <Button icon="delete" onClick={() => deleteLink(link._id)}>
            Delete
          </Button>
        }
      </CardActions>
    </Card>
  )
}


export default LinkCard

function addDefaultSrc(ev) {
  ev.target.src = 'data:image/png;base64,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'
}
