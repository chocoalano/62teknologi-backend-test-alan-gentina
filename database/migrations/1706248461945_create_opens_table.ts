import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'opens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('is_overnight').notNullable()
      table.bigint('start').notNullable()
      table.bigint('end').notNullable()
      table.bigint('day').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}