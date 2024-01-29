import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Business from './business.js'
import Open from './open.js'

export default class Hour extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare business_id: number
  @column()
  declare open_id: number
  @column()
  declare hours_type: string
  @column()
  declare is_open_now: boolean
  @belongsTo(() => Business, {
    foreignKey: 'business_id'
  })
  declare business: BelongsTo<typeof Business>
  @belongsTo(() => Open, {
    foreignKey: 'open_id'
  })
  declare open: BelongsTo<typeof Open>
}