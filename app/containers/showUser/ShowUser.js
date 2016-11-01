import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Button} from 'react-toolbox/lib/button'

import {UserCard, LinkList} from 'components'

import {loadUsersRequest, deleteUserRequest, deleteLinkRequest, starLinkRequest} from 'store/modules/users'
import {selectors} from 'store/modules'

//import style from './ListUsers.scss'

const stateToProps = state => ({
  users: selectors.getAllUsers(state),
  links: selectors.getAllLinks(state),
  currUser: state.auth.user
})

const dispatchToProps = dispatch => ({
  loadUsers: () => dispatch(loadUsersRequest()),
  showUser: (id) => dispatch(push(`/users/${id}`)),
  deleteUser: (id) => dispatch(deleteUserRequest(id)),
  pushState: (path) => dispatch(push(path)),
  deleteLink: (linkId) => dispatch(deleteLinkRequest(linkId)),
  starLink: (linkId) => dispatch(starLinkRequest(linkId))
})

class ShowUser extends React.Component {
  componentDidMount() {
    this.props.loadUsers()
  }
  render() {
    const {users, links, currUser, showUser, deleteUser, params} = this.props
    const user = users.find(u => u._id === params.userId)
    return (
      <div>
        {user ?
          <UserCard
            user={user}
            onUserClick={() => showUser(user._id)}
            currUser={currUser}
            onDeleteClick={() => deleteUser(user._id)}
          >
            {user.links.length}
            {user.links.length === 1 ? ' link' : ' links'}
            <LinkList
              user={user}
              users={users}
              links={links.filter(l => l.userId === user._id)}
              deleteLink={this.props.deleteLink}
              starLink={this.props.starLink}
              push={this.props.pushState}
            />
          </UserCard> :
          <div>No user found</div>
        }
      </div>
    )
  }
}

export default connect(stateToProps, dispatchToProps)(ShowUser)
