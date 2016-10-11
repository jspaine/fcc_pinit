import {Observable} from 'rxjs/Observable'
import {denormalize} from 'denormalizr'

import api from '../../lib/apiClient'
import * as schema from '../schema'

const LOAD_USERS_REQUEST = 'users/LOAD_USERS_REQUEST'
export const LOAD_USERS_SUCCESS = 'users/LOAD_USERS_SUCCESS'
const LOAD_USERS_FAILURE = 'users/LOAD_USERS_FAILURE'

const SAVE_USER_REQUEST = 'users/SAVE_USER_REQUEST'
const SAVE_USER_SUCCESS = 'users/SAVE_USER_SUCCESS'
const SAVE_USER_FAILURE = 'users/SAVE_USER_FAILURE'

const DELETE_USER_REQUEST = 'users/DELETE_USER_REQUEST'
export const DELETE_USER_SUCCESS = 'users/DELETE_USER_SUCCESS'
const DELETE_USER_FAILURE = 'users/DELETE_USER_FAILURE'

const DELETE_LINK_REQUEST = 'users/DELETE_LINK_REQUEST'
const DELETE_LINK_SUCCESS = 'users/DELETE_LINK_SUCCESS'
const DELETE_LINK_FAILURE = 'users/DELETE_LINK_FAILURE'

const SAVE_LINK_REQUEST = 'users/SAVE_LINK_REQUEST'
const SAVE_LINK_SUCCESS = 'users/SAVE_LINK_SUCCESS'
const SAVE_LINK_FAILURE = 'users/SAVE_LINK_FAILURE'

const STAR_LINK_REQUEST = 'users/STAR_LINK_REQUEST'
const STAR_LINK_SUCCESS = 'users/STAR_LINK_SUCCESS'
const STAR_LINK_FAILURE = 'users/STAR_LINK_FAILURE'

const initialState = {
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS_REQUEST:
    case SAVE_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case DELETE_LINK_REQUEST:
    case SAVE_LINK_REQUEST:
    case STAR_LINK_REQUEST:   // split into diff types of pending
      return {
        ...state,
        pending: true,
        error: null
      }
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        pending: false
      }
    case SAVE_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        users: [
          action.user,
          ...state.users
        ]
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        users: state.users.filter(user => user._id !== action.user._id)
      }
    case DELETE_LINK_SUCCESS:
    case SAVE_LINK_SUCCESS:
    case STAR_LINK_SUCCESS:
      return {
        ...state,
        pending: false,
        users: [
          action.user,
          ...state.users.filter(user => user._id !== action.user._id)
        ]
      }
    case LOAD_USERS_FAILURE:
    case SAVE_USER_FAILURE:
    case DELETE_USER_FAILURE:
    case DELETE_LINK_FAILURE:
    case SAVE_LINK_REQUEST:
    case STAR_LINK_REQUEST:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default: return state
  }
}

export const loadUsersRequest = () => ({
  type: LOAD_USERS_REQUEST
})

const loadUsersSuccess = (users) => {
  return {
    type: LOAD_USERS_SUCCESS,
    users
  }
}

const loadUsersFailure = (error) => ({
  type: LOAD_USERS_FAILURE,
  error
})

export const saveUserRequest = (user) => ({
  type: SAVE_USER_REQUEST,
  user
})

const saveUserSuccess = (user) => {
  return {
    type: SAVE_USER_SUCCESS,
    user
  }
}

const saveUserFailure = (error) => ({
  type: SAVE_USER_FAILURE,
  error
})

export const deleteUserRequest = (id) => ({
  type: DELETE_USER_REQUEST,
  id
})

const deleteUserSuccess = (user) => {
  return {
    type: DELETE_USER_SUCCESS,
    user
  }
}

const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  error
})

export const deleteLinkRequest = (linkId) => ({
  type: DELETE_LINK_REQUEST,
  linkId
})

const deleteLinkSuccess = (user) => {
  return {
    type: DELETE_LINK_SUCCESS,
    user
  }
}

const deleteLinkFailure = (error) => ({
  type: DELETE_LINK_FAILURE,
  error
})

export const saveLinkRequest = (link) => ({
  type: SAVE_LINK_REQUEST,
  link
})

const saveLinkSuccess = (user) => {
  return {
    type: SAVE_LINK_SUCCESS,
    user
  }
}

const saveLinkFailure = (error) => ({
  type: SAVE_LINK_FAILURE,
  error
})

export const starLinkRequest = (linkId) => ({
  type: STAR_LINK_REQUEST,
  linkId
})

const starLinkSuccess = (user) => {
  return {
    type: STAR_LINK_SUCCESS,
    user
  }
}

const starLinkFailure = (error) => ({
  type: STAR_LINK_FAILURE,
  error
})

export const loadUsersEpic = action$ =>
  action$.ofType(LOAD_USERS_REQUEST)
    .mergeMap(action =>
      api.get('api/users')
        .map(loadUsersSuccess)
        .catch(err => Observable.of(loadUsersFailure(err)))
    )

export const saveUserEpic = action$ =>
  action$.ofType(SAVE_USER_REQUEST)
    .mergeMap(action => {
      if (action.user._id) {
        return api.put(`api/users/${action.user._id}`, {
          data: action.user
        })
          .map(saveUserSuccess)
          .catch(err => Observable.of(saveUserFailure(err)))
      }
      return api.post('api/users', {
          data: action.user
        })
          .map(saveUserSuccess)
          .catch(err => Observable.of(saveUserFailure(err)))
    })

export const deleteUserEpic = action$ =>
  action$.ofType(DELETE_USER_REQUEST)
    .mergeMap(action =>
      api.del(`api/users/${action.id}`)
        .map(deleteUserSuccess)
        .catch(err => Observable.of(deleteUserFailure(err)))
    )

export const deleteLinkEpic = action$ =>
  action$.ofType(DELETE_LINK_REQUEST)
    .do(x => console.log('delete',x))
    .mergeMap(action =>
      api.del(`api/users/link/${action.linkId}`)
        .map(deleteLinkSuccess)
        .catch(err => Observable.of(deleteLinkFailure(err)))
    )

export const saveLinkEpic = action$ =>
  action$.ofType(SAVE_LINK_REQUEST)
    .mergeMap(action =>
      api.post('api/users/link', {
        data: action.link
      })
        .map(saveLinkSuccess)
        .catch(err => Observable.of(starLinkFailure(err)))
    )

export const starLinkEpic = action$ =>
  action$.ofType(STAR_LINK_REQUEST)
    .mergeMap(action =>
      api.post(`api/users/link/${action.linkId}/star`)
        .map(starLinkSuccess)
        .catch(err => Observable.of(starLinkFailure(err)))
    )


export function getAllUsers(state) {
  return state.users
}

export function getAllLinks(state) {
  return flatMap(
    state.users,
    user => user.links.map(link => ({
      ...link,
      userId: user._id,
      username: user.username,
      avatar: user.image
    }))
  ).sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1
    if (b.createdAt < a.createdAt) return -1
    return 0
  })
}


function flatMap(arr, f) {
  return Array.prototype.concat.apply(
    [],
    arr.map(f)
  )
}
