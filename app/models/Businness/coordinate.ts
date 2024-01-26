import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Business from './business.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Coordinate extends BaseModel {
  @column()
  declare business_id: number
  @column()
  declare latitude: number
  @column()
  declare longitude: number
  @belongsTo(() => Business, {
    foreignKey: 'business_id'
  })
  declare business: BelongsTo<typeof Business>
}