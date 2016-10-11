import jwt from 'jsonwebtoken'

import User from './model'
import config from '../../config'

export default {
  index: async (ctx) => {
    const users = await User.find()
    ctx.body = users
  },

  show: async (ctx) => {
    if (ownOrAdmin(ctx.params, ctx.state.user))
      ctx.body = await User.findOne({ _id: ctx.params.id })
    else
      ctx.status = 403
  },

  create: async (ctx) => {
    const newUser = new User(ctx.request.body)
    const existingUsers = await User.find({
      $or: [
        {username: newUser.username},
        {email: newUser.email}
      ]
    })

    if (existingUsers.length === 0) {
      const user = await newUser.save()
      const token = jwt.sign({ _id: user._id, role: user.role}, config.secrets.token)

      ctx.body = {
        id: user._id,
        token
      }
    } else {
      ctx.status = 500
      const usernames = existingUsers.map(u => u.username)
      const emails = existingUsers.map(u => u.email)
      const error = []
      if (usernames.find(name => name === newUser.username))
        error.push('username taken')
      if (emails.find(email => email === newUser.email))
        error.push('email taken')
      ctx.body = {error}
    }
  },

  del: async (ctx) => {
    if (ownOrAdmin(ctx.params, ctx.state.user)) {
      ctx.body = await User.findOneAndRemove({ _id: ctx.params.id })
      ctx.status = 200
    } else {
      ctx.status = 403
    }
  },

  me: async (ctx) => {
    const user = await User.findOne({ _id: ctx.state.user._id })
    ctx.body = user
  },

  update: async (ctx) => {
    if (ownOrAdmin(ctx.params, ctx.state.user)) {
      const user = await User.findOne({ _id: ctx.params.id })
      user.password = ctx.request.body.password
      await user.save()
      ctx.status = 200
    } else {
      ctx.status = 403
    }
  },

  addLink: async (ctx) => {
    const user = await User.findOne({ _id: ctx.state.user._id })
    user.links.push(ctx.request.body)
    ctx.body = await user.save()
  },

  delLink: async (ctx) => {
    const user = await User.findOne({'links._id': ctx.params.linkId})
    const link = user.links.id(ctx.params.linkId)

    if (!user._id === ctx.state.user._id) {
      return ctx.status = 403
    }

    user.links.id(link._id).remove()
    ctx.body = await user.save()
  },

  addStar: async (ctx) => {
    const user = await User.findOne({'links._id': ctx.params.linkId})
    const link = user.links.id(ctx.params.linkId)

    const starred = link.stars.find(star =>
      star.user.toString() === ctx.state.user._id)

    if (starred) {
      link.stars.id(starred._id).remove()
    } else {
      link.stars.push({user: ctx.state.user._id})
    }

    ctx.body = await user.save()
  }
}

function ownOrAdmin(target, user) {
  return user.role === 'admin' || user._id === target.id
}
