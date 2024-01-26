import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('business_id').unsigned().references('businesses.id').onDelete('CASCADE')
      table.string('address1', 50)
      table.string('address2', 50)
      table.string('address3', 50)
      table.string('city', 50)
      table.string('country', 50)
      table.string('state', 50)
      table.string('zip_code', 50)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}