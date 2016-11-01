import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Button} from 'react-toolbox/lib/button'

import {selectors} from 'store/modules'
import {
  loadUsersRequest,
  deleteLinkRequest,
  saveLinkRequest,
  starLinkRequest
} from 'store/modules/users'
import {LinkList} from 'components'

import style from './Home.scss'

const stateToProps = state => ({
  user: state.auth.user,
  users: selectors.getAllUsers(state),
  links: selectors.getAllLinks(state)
})

const dispatchToProps = dispatch => ({
  loadUsers: () => dispatch(loadUsersRequest()),
  pushState: (path) => dispatch(push(path)),
  deleteLink: (linkId) => dispatch(deleteLinkRequest(linkId)),
  starLink: (linkId) => dispatch(starLinkRequest(linkId))
})

class Home extends React.Component {
  componentWillMount() {
    this.props.loadUsers()
  }
  render() {
    const {user, users, links, deleteLink, starLink} = this.props
    return (
      <LinkList
        user={user}
        users={users}
        links={links}
        deleteLink={deleteLink}
        starLink={starLink}
        push={this.props.pushState}
      />
    )
  }
}

export default connect(stateToProps, dispatchToProps)(Home)
