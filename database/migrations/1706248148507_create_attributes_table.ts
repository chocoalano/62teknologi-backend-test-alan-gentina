import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attributes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('business_id').unsigned().references('businesses.id').onDelete('CASCADE')
      table.integer('business_temp_closed')
      table.boolean('outdoor_seating')
      table.boolean('liked_by_vegans')
      table.boolean('liked_by_vegetarians')
      table.date('hot_and_new')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}