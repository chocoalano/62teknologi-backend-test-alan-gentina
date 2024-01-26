import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Business from './business.js'

export default class Photo extends BaseModel {
  @column({ isPrimary: true })
  declare photo_id: number
  @column()
  declare business_id: number
  @column()
  declare url: string
  @column()
  declare caption: string
  @column()
  declare width: number
  @column()
  declare height: number
  @column()
  declare is_user_submitted: boolean
  @column()
  declare user_id: number
  @column()
  declare label: string

  @belongsTo(() => Business, {
    foreignKey: 'business_id'
  })
  declare business: BelongsTo<typeof Business>
}