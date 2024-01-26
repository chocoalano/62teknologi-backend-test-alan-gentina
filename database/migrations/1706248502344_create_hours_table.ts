import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'hours'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('business_id').unsigned().references('businesses.id').onDelete('CASCADE')
      table.integer('open_id').unsigned().references('opens.id').onDelete('CASCADE')
      table.string('hours_type', 100).notNullable()
      table.boolean('is_open_now').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}