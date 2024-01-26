/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import BusinessesController from '#controllers/Business/businesses_controller'
import CategoriesController from '#controllers/Business/categories_controller'
import OpenController from '#controllers/Business/open_controller'
import AuthController from '#controllers/auth_controller'
import UsersController from '#controllers/users_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'hello PT. 62 TEKNOLOGI',
  }
})
router.group(() => {
  router.post('/:option', [AuthController, 'store']).prefix('/auth')
})
router.group(() => {
  /**
   * All routes registered inside the callback
   * are part of the surrounding group
   */
  router.group(() => {
    router.get('/profile', [AuthController, 'show'])
    router.put('/profile-update', [AuthController, 'update'])
    router.get('/', [AuthController, 'logout'])
  }).prefix('/auth')

  router.resource('users', UsersController)
  
  router.group(() => {
    router.resource('categories', CategoriesController)
    router.resource('open', OpenController)
    router.get('list', [BusinessesController, 'index'])
    router.post('store', [BusinessesController, 'store'])
    router.get('show/:id', [BusinessesController, 'show'])
    router.patch('update/:id', [BusinessesController, 'update'])
    router.delete('delete/:id', [BusinessesController, 'destroy'])
  }).prefix('/business')
}).use(middleware.auth({
  guards: ['api']
}))
