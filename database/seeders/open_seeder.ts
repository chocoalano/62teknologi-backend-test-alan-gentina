import { OpenFactory } from '#database/factories/open_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await OpenFactory.createMany(20)
  }
}