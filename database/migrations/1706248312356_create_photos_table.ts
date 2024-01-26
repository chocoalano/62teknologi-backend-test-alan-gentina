import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'photos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('photo_id')
      table.integer('business_id').unsigned().references('businesses.id').onDelete('CASCADE')
      table.string('url')
      table.string('caption', 100)
      table.integer('width')
      table.integer('height')
      table.boolean('is_user_submitted')
      table.bigint('user_id').nullable()
      table.string('label', 100)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}