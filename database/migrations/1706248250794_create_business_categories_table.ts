import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'business_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('business_id').unsigned().references('businesses.id').onDelete('CASCADE')
      table.integer('categories_id').unsigned().references('categories.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}