import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Location from './location.js'
import Coordinate from './coordinate.js'
import Attribute from './attribute.js'
import BusinessCategory from './business_category.js'
import Hour from './hour.js'
import Photo from './photo.js'

export default class Business extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare display_phone: string
  @column()
  declare distance: number
  @column()
  declare image_url: string
  @column()
  declare is_claimed: boolean
  @column()
  declare is_closed: boolean
  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare date_opened: DateTime
  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare date_closed: DateTime
  @column()
  declare name: string
  @column()
  declare phone: string
  @column()
  declare price: string
  @column()
  declare rating: number
  @column()
  declare review_count: number
  @column()
  declare transactions: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // relationship has one
  @hasOne(() => Coordinate, {
    localKey: 'id',
    foreignKey: 'business_id'
  })
  declare kordinat: HasOne<typeof Coordinate>

  @hasOne(() => Location, {
    localKey: 'id',
    foreignKey: 'business_id'
  })
  declare lokasi: HasOne<typeof Location>

  @hasOne(() => Attribute, {
    localKey: 'id',
    foreignKey: 'business_id'
  })
  declare attribute: HasOne<typeof Attribute>

  @hasMany(() => Photo, {
    localKey: 'id',
    foreignKey: 'business_id'
  })
  declare photo: HasMany<typeof Photo>

  // relationship many to many
  @manyToMany(() => BusinessCategory, {
    localKey: 'id',
    pivotForeignKey: 'business_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'categories_id',
  })
  declare categories: ManyToMany<typeof BusinessCategory>

  @manyToMany(() => Hour, {
    localKey: 'id',
    pivotForeignKey: 'business_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'open_id',
  })
  declare hours: ManyToMany<typeof Hour>
}