import {Schema, arrayOf} from 'normalizr'

export const user = new Schema('users', {idAttribute: '_id'})
export const link = new Schema('links', {idAttribute: '_id'})
export const star = new Schema('start', {idAttribute: '_id'})
export const arrayOfUsers = arrayOf(user)
export const arrayOfLinks = arrayOf(link)
export const arrayOfStars = arrayOf(star)

user.define({
  links: arrayOfLinks
})

link.define({
  star: arrayOfStars
})

star.define({
  user: user
})
