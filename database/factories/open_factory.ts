import Open from '#models/Businness/open'
import factory from '@adonisjs/lucid/factories'

export const OpenFactory = factory
  .define(Open, async ({ faker }) => {
    return {
      is_overnight: true,
      start: faker.number.float(5),
      end: faker.number.float(5),
      day: faker.number.float(5),
    }
  })
  .build()