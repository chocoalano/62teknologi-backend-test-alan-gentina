import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Business from './business.js'
import Category from './category.js'

export default class BusinessCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare business_id: number
  @column()
  declare categories_id: number

  @belongsTo(() => Business, {
    foreignKey: 'business_id'
  })
  declare business: BelongsTo<typeof Business>
  
  @belongsTo(() => Category, {
    foreignKey: 'categories_id'
  })
  declare category: BelongsTo<typeof Category>
}