import Business from '#models/Businness/business'
import User from '#models/user'
import { test } from '@japa/runner'

test.group('Business', () => {
  let url = 'business'
  test('List test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .get(`${url}/list?page=1&limit=10&sortDesc=&sortBy=id&search=`)
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('Show test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const b = await Business.query().orderBy('id', 'desc').firstOrFail()
    const response = await client
      .get(`${url}/show/${b.id}`)
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('Delete test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const b = await Business.query().orderBy('id', 'desc').firstOrFail()
    const response = await client
      .delete(`${url}/delete/${b.id}`)
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
})