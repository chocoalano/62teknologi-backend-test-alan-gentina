import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Business from './business.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Location extends BaseModel {
  @column()
  declare business_id: number
  @column()
  declare address1: string
  @column()
  declare address2: string
  @column()
  declare address3: string
  @column()
  declare city: string
  @column()
  declare country: string
  @column()
  declare state: string
  @column()
  declare zip_code: string
  @belongsTo(() => Business, {
    foreignKey: 'business_id'
  })
  declare business: BelongsTo<typeof Business>
}