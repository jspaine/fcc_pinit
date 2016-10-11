import {combineReducers} from 'redux'
import {combineEpics} from 'redux-observable'
import {routerReducer as routing} from 'react-router-redux'

import auth, * as fromAuth from './auth'
import users, * as fromUsers from './users'
import ui from './ui'

export const rootReducer = combineReducers({
  auth,
  users,
  ui,
  routing,
})

export const rootEpic = combineEpics(
  fromAuth.loginEpic,
  fromUsers.loadUsersEpic,
  fromUsers.saveUserEpic,
  fromUsers.deleteUserEpic,
  fromUsers.deleteLinkEpic,
  fromUsers.saveLinkEpic,
  fromUsers.starLinkEpic
)

export const selectors = {
  getAllUsers(state) {
    return fromUsers.getAllUsers(state.users)
  },
  getAllLinks(state) {
    return fromUsers.getAllLinks(state.users)
  },
  getUserId(state) {
    return fromAuth.getUserId(state.auth)
  }
}
