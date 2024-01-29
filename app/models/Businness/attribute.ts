import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Business from './business.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Attribute extends BaseModel {
  @column()
  declare business_id: number
  @column()
  declare business_temp_closed: number
  @column()
  declare outdoor_seating: boolean
  @column()
  declare liked_by_vegans: boolean
  @column()
  declare liked_by_vegetarians: boolean
  @column.date()
  declare hot_and_new: DateTime

  @belongsTo(() => Business, {
    foreignKey: 'business_id'
  })
  declare business: BelongsTo<typeof Business>
}