import Category from '#models/Businness/category'
import factory from '@adonisjs/lucid/factories'

export const CategoryFactory = factory
  .define(Category, async ({ faker }) => {
    return {
      alias: faker.lorem.words(),
      title: faker.lorem.words()
    }
  })
  .build()