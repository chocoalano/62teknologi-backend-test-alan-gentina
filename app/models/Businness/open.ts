import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Hour from './hour.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Open extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare is_overnight: boolean
  @column()
  declare start: number
  @column()
  declare end: number
  @column()
  declare day: number
  
  @belongsTo(() => Hour, {
    foreignKey: 'open_id'
  })
  declare hour: BelongsTo<typeof Hour>
}