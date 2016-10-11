import Router from 'koa-router'

import controller from './controller'
import auth from '../../lib/authService'

const router = new Router()

router.get('/', controller.index)
router.post('/', controller.create)
router.get('/me', auth.isAuthenticated, controller.me)
router.put('/:id/password', auth.isAuthenticated, controller.update)
router.get('/:id', auth.isAuthenticated, controller.show)
router.del('/:id', auth.isAuthenticated, controller.del)
router.post('/link', auth.isAuthenticated, controller.addLink)
router.del('/link/:linkId', auth.isAuthenticated, controller.delLink)
router.post('/link/:linkId/star', auth.isAuthenticated, controller.addStar)

export default router
