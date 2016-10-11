import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Input} from 'react-toolbox/lib/input'
import {Button} from 'react-toolbox/lib/button'

import {selectors} from 'store/modules'
import {
  loadUsersRequest,
  saveLinkRequest,
  starLinkRequest
} from 'store/modules/users'
import {LinkList} from 'components'

// import style from './NewLink.scss'

const stateToProps = state => ({
  pending: state.users.pending
})

const dispatchToProps = dispatch => ({
  pushState: (link) => dispatch(push(link)),
  saveLink: (link) => dispatch(saveLinkRequest(link))
})

class NewLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.pending && !nextProps.pending) {
      this.props.pushState('/')
    }
  }
  handleChange(field) {
    return value => this.setState({
      [field]: value
    })
  }
  render() {
    const {pending, saveLink} = this.props
    return (
      <form onSubmit={ev => ev.preventDefault()}>
        <Input
          autoFocus
          required
          label="url"
          value={this.state.url}
          onChange={this.handleChange('url')}
        />
        <Input
          label="description"
          value={this.state.description}
          onChange={this.handleChange('description')}
        />
        <Button
          onClick={() => {
            saveLink({
              url: this.state.url,
              description: this.state.description
            })
          }}
          disabled={!this.state.url.trim().match(/http(s?):\/\/\w+/)}
        >
          Save
        </Button>
      </form>
    )
  }
}

export default connect(stateToProps, dispatchToProps)(NewLink)
