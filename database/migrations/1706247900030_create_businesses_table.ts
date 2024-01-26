import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'businesses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('display_phone', 15).notNullable()
      table.decimal('distance').notNullable()
      table.string('image_url').notNullable()
      table.boolean('is_claimed').notNullable()
      table.boolean('is_closed').notNullable()
      table.date('date_opened').notNullable()
      table.date('date_closed').notNullable()
      table.string('name').notNullable()
      table.string('phone', 15).notNullable()
      table.string('price', 10).notNullable()
      table.integer('rating').notNullable()
      table.integer('review_count').notNullable()
      table.string('transactions').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}