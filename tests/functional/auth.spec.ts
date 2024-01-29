import User from '#models/user'
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'

test.group('Auth', () => {
  test('login test', async ({ client }) => {
    const response = await client
      .post('/auth/login')
      .form({
        email: "super@user.tes",
        password: "123456"
      })
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('register test', async ({ client }) => {
    const response = await client
      .post('/auth/login')
      .form({
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        password: "123456"
      })
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('profile test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .get('/auth/profile')
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('profile update test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .put('/auth/profile-update')
      .form({
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        password: "123456",
        password_confirmation: "123456"
      })
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('logout test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .get('/auth')
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
})