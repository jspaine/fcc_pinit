import merge from 'lodash.merge'

import dev from './dev'
import prod from './prod'
import test from './test'

const config = {
  port: process.env.PORT || 8000,
  host: process.env.HOST || 'localhost',
  protocol: process.env.PROTOCOL || 'http',

  db: {
    uri: process.env.MONGODB_URI || 'localhost/koa-pinit',
    options: {
      db: { safe: true }
    },
    seed: false
  },
  secrets: {
    token: process.env.TOKEN_SECRET || 'koa-pinit'
  },
  github: {
    clientID: process.env.GITHUB_ID || '',
    clientSecret: process.env.GITHUB_SECRET || '',
    callbackURL: '/api/auth/github/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || '',
    clientSecret: process.env.GOOGLE_SECRET || '',
    callbackURL: '/api/auth/google/callback'
  },
  useCookie: false
}

switch (process.env.NODE_ENV) {
  case 'test':
    merge(config, test)
    break
  case 'production':
    merge(config, prod)
    break
  default: merge(config, dev)
}

export default config
