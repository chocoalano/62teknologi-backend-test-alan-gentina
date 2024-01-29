import User from '#models/user'
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'

test.group('Users', () => {
  let url = 'users'
  test('List test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .get(`${url}?page=1&limit=10&search=Super`)
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('Store test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .post(`${url}`)
      .form({
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456',
        password_confirmation: '123456',
      })
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('Show test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const userdata = await User.query().orderBy('id', 'desc').firstOrFail()
    const response = await client
      .get(`${url}/${userdata.id}`)
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('Update test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const userdata = await User.query().orderBy('id', 'desc').firstOrFail()
    const response = await client
      .put(`${url}/${userdata.id}`)
      .form({
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456',
        password_confirmation: '123456',
      })
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('Delete test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const userdata = await User.query().orderBy('id', 'desc').firstOrFail()
    const response = await client
      .delete(`${url}/${userdata.id}`)
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
})