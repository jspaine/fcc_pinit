import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {Provider} from 'react-redux'

import createStore from 'store'
import {
  App,
  Home,
  Login,
  ListUsers,
  NewLink,
  ShowUser
} from 'containers'

const store = createStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

export default function() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/token/:token" component={App} />
        <Route path="/" component={App}>
          <IndexRoute component={Home} />

          <Route onEnter={requireLogin}>
            <Route path="links" component={NewLink} />
          </Route>

          <Route path="login" component={Login} />
          <Route path="users/:userId" component={ShowUser} />
          <Route path="users" component={ListUsers} />
        </Route>
      </Router>
    </Provider>
  )
}

function requireLogin(nextState, replace, cb) {
  const {auth: {user}} = store.getState()
  if (user && user.role !== 'guest') return cb()
  replace('/')
  cb()
}

function requireAdmin(nextState, replace, cb) {
  const {auth: {user}} = store.getState()
  if (user && user.role === 'admin') return cb()
  replace('/')
  cb()
}
