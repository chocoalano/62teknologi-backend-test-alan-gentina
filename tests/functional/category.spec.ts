import Category from '#models/Businness/category'
import User from '#models/user'
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'

test.group('Categories', () => {
  let url = 'business/categories'
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
        alias: faker.lorem.words(),
        title: faker.lorem.words(),
      })
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('Show test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const categories = await Category.query().orderBy('id', 'desc').firstOrFail()
    const response = await client
      .get(`${url}/${categories.id}`)
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('Update test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const categories = await Category.query().orderBy('id', 'desc').firstOrFail()
    const response = await client
      .put(`${url}/${categories.id}`)
      .form({
        alias: faker.lorem.words(),
        title: faker.lorem.words(),
      })
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
  test('Delete test', async ({ client }) => {
    const user = await User.findOrFail(1)
    const categories = await Category.query().orderBy('id', 'desc').firstOrFail()
    const response = await client
      .delete(`${url}/${categories.id}`)
      .withGuard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBody(response.body())
  })
})