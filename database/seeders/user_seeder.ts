import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'Super User Test',
      email: 'super@user.tes',
      password: '123456'
    })
  }
}