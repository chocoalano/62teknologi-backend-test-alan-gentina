import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'coordinates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('business_id').unsigned().references('businesses.id').onDelete('CASCADE')
      table.decimal('latitude', 12,2).nullable()
      table.decimal('longitude', 12,2).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}