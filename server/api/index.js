import Router from 'koa-router'

import user from './user'
import auth from './auth'

const router = new Router({
  prefix: '/api'
})

router.use('/users', user.routes())
router.use('/auth', auth.routes())

export default router
