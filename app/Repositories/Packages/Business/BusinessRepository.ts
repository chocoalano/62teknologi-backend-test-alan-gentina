import BaseRepository from "../../BaseRepository.js";
import Business from '#models/Businness/business';
import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { cuid } from '@adonisjs/core/helpers'
import Coordinate from "#models/Businness/coordinate";
import Location from "#models/Businness/location";
import Attribute from "#models/Businness/attribute";
import Photo from "#models/Businness/photo";
import Hour from "#models/Businness/hour";
import { DateTime } from "luxon";
import path from "path";
import { unlink } from "../../../helpers.js";

export default class BusinessRepository extends BaseRepository {
    constructor() {
        super(Business);
    }

    async paginationBusiness(input: { page: number; limit: number; sortDesc: boolean; sortBy: string; search: string; }) {
        const { page, limit, sortDesc, sortBy, search } = input
        const count = await Business
            .query()
            .whereHas('attribute', (query) => {
                query
                    .where('business_temp_closed', 'LIKE', '%' + search + '%')
            })
            .orWhereHas('categories_related', (query) => {
                query.whereHas('category', (qcategory) => {
                    qcategory
                        .where('title', 'LIKE', '%' + search + '%')
                })
            })
            .orWhereHas('kordinat', (query) => {
                query
                    .where('latitude', 'LIKE', '%' + search + '%')
                    .orWhere('longitude', 'LIKE', '%' + search + '%')
            })
            .count('* as total')
        let total = limit < 0 ? count[0].$extras.total : limit
        const q = await Business.query()
            .whereHas('attribute', (query) => {
                query
                    .where('business_temp_closed', 'LIKE', '%' + search + '%')
            })
            .orWhereHas('categories_related', (query) => {
                query.whereHas('category', (qcategory) => {
                    qcategory
                        .where('title', 'LIKE', '%' + search + '%')
                })
            })
            .orWhereHas('kordinat', (query) => {
                query
                    .where('latitude', 'LIKE', '%' + search + '%')
                    .orWhere('longitude', 'LIKE', '%' + search + '%')
            })
            .orderBy(sortBy === 'id' || sortBy === 'createdAt' ? sortBy : 'createdAt', sortDesc ? 'desc' : 'asc')
            .preload('attribute')
            .preload('categories_related')
            .preload('open_hour')
            .preload('kordinat')
            .preload('lokasi')
            .preload('photo')
            .paginate(page, total)
        return q
    }

    async storeBusiness(input: any, photos: any, img: any) {
        if (photos.length > 0) {
            for (let i = 0; i < photos.length - 1; i++) {
                const file = photos[i].image
                const filename = `${cuid()}.${file.extname}`
                input.photos[i]['url'] = `${env.get('BASH_URL')}/images/${filename}`
                input.photos[i]['label'] = filename
                await file.move(app.makePath('uploads'), {
                    name: filename
                })
            }
        }
        if (img) {
            const imgname = `${cuid()}.${img!.extname}`
            input['image_url'] = `${env.get('BASH_URL')}/images/${imgname}`
            await img!.move(app.makePath('uploads'), {
                name: imgname
            })
        }
        const b = new Business()
        b.display_phone = input.display_phone
        b.distance = input.distance
        b.image_url = input.image_url
        b.is_claimed = input.is_claimed
        b.is_closed = input.is_closed
        b.date_opened = DateTime.local(input.date_opened)
        b.date_closed = DateTime.local(input.date_closed)
        b.name = input.name
        b.phone = input.phone
        b.price = input.price
        b.rating = input.rating
        b.review_count = input.review_count
        b.transactions = input.transactions
        if (await b.save()) {
            // save to Coordinate
            const c = new Coordinate()
            c.latitude = input.coordinate.latitude
            c.longitude = input.coordinate.longitude
            await b.related('kordinat').save(c)
            // save to Location
            const l = new Location()
            l.address1 = input.location.address1
            l.address2 = input.location.address2
            l.address3 = input.location.address3
            l.city = input.location.city
            l.country = input.location.country
            l.state = input.location.state
            l.zip_code = input.location.zip_code
            await b.related('lokasi').save(l)
            // save to attribute
            const a = new Attribute()
            a.business_temp_closed = input.attribute.business_temp_closed
            a.outdoor_seating = input.attribute.outdoor_seating
            a.liked_by_vegans = input.attribute.liked_by_vegans
            a.liked_by_vegetarians = input.attribute.liked_by_vegetarians
            a.hot_and_new = DateTime.local(input.attribute.hot_and_new)
            await b.related('attribute').save(a)
            // save to photo
            const arr: any[] = []
            input.photos.forEach((e: { url: string; caption: string; width: number; height: number; is_user_submitted: boolean; user_id: number; label: string; }) => {
                const p = new Photo()
                p.url = e.url
                p.caption = e.caption
                p.width = e.width
                p.height = e.height
                p.is_user_submitted = e.is_user_submitted
                p.user_id = e.user_id
                p.label = e.label
                arr.push(p)
            });
            await b.related('photo').saveMany(arr)
            await b.related('categories').sync(input.category)
            const arropen: any[] = []
            input.open_hours.forEach((e: { open_id: number; hours_type: string; is_open_now: boolean; }) => {
                const h = new Hour()
                h.open_id = e.open_id
                h.hours_type = e.hours_type
                h.is_open_now = e.is_open_now
                arropen.push(h)
            });
            await b.related('hours').createMany(arropen)
        }
        return input
    }

    async showBusiness(id: number) {
        try {
            const q = await Business
                .query()
                .where('id', id)
                .preload('attribute')
                .preload('categories_related')
                .preload('kordinat')
                .preload('lokasi')
                .preload('open_hour')
                .preload('photo')
                .first()
            return q
        } catch (error) {
            return error
        }
    }

    async updateBusiness(id: number, input: any, photos: any, img: any) {
        const q = await Business
            .query()
            .where('id', id)
            .preload('attribute')
            .preload('categories_related')
            .preload('kordinat')
            .preload('lokasi')
            .preload('open_hour')
            .preload('photo')
            .first()
        if (photos.length > 0) {
            q?.photo.forEach(async e => {
                const file = app.makePath('uploads', e.label)
                await unlink(file)
                return
            });
            for (let i = 0; i < photos.length - 1; i++) {
                const file = photos[i].image
                const filename = `${cuid()}.${file.extname}`
                input.photos[i]['url'] = `${env.get('BASH_URL')}/images/${filename}`
                input.photos[i]['label'] = filename
                await file.move(app.makePath('uploads'), {
                    name: filename
                })
            }
        }
        if (img) {
            const imageName = path.basename(q!.image_url);
            const file = app.makePath('uploads', imageName)
            await unlink(file)
            const imgname = `${cuid()}.${img!.extname}`
            input['image_url'] = `${env.get('BASH_URL')}/images/${imgname}`
            await img!.move(app.makePath('uploads'), {
                name: imgname
            })
        }
        const b = await Business.findOrFail(q!.id)
        b.display_phone = input.display_phone
        b.distance = input.distance
        b.image_url = input.image_url
        b.is_claimed = input.is_claimed
        b.is_closed = input.is_closed
        b.date_opened = DateTime.local(input.date_opened)
        b.date_closed = DateTime.local(input.date_closed)
        b.name = input.name
        b.phone = input.phone
        b.price = input.price
        b.rating = input.rating
        b.review_count = input.review_count
        b.transactions = input.transactions
        if (await b.save()) {
            // save to Coordinate
            await Coordinate.query().where('business_id', b.id).delete()
            const c = new Coordinate()
            c.latitude = input.coordinate.latitude
            c.longitude = input.coordinate.longitude
            await b.related('kordinat').save(c)
            // // save to Location
            await Location.query().where('business_id', b.id).delete()
            const l = new Location()
            l.address1 = input.location.address1
            l.address2 = input.location.address2
            l.address3 = input.location.address3
            l.city = input.location.city
            l.country = input.location.country
            l.state = input.location.state
            l.zip_code = input.location.zip_code
            await b.related('lokasi').save(l)
            // // save to attribute
            await Attribute.query().where('business_id', b.id).delete()
            const a = new Attribute()
            a.business_temp_closed = input.attribute.business_temp_closed
            a.outdoor_seating = input.attribute.outdoor_seating
            a.liked_by_vegans = input.attribute.liked_by_vegans
            a.liked_by_vegetarians = input.attribute.liked_by_vegetarians
            a.hot_and_new = DateTime.local(input.attribute.hot_and_new)
            await b.related('attribute').save(a)
            // // save to photo
            const arr: any[] = []
            input.photos.forEach((e: { url: string; caption: string; width: number; height: number; is_user_submitted: boolean; user_id: number; label: string; }) => {
                const p = new Photo()
                p.url = e.url
                p.caption = e.caption
                p.width = e.width
                p.height = e.height
                p.is_user_submitted = e.is_user_submitted
                p.user_id = e.user_id
                p.label = e.label
                arr.push(p)
            });
            await Photo.query().where('business_id', b.id).delete()
            await b.related('photo').saveMany(arr)
            await b.related('categories').sync(input.category)
            const arropen: any[] = []
            input.open_hours.forEach((e: { open_id: number; hours_type: string; is_open_now: boolean; }) => {
                const h = new Hour()
                h.open_id = e.open_id
                h.hours_type = e.hours_type
                h.is_open_now = e.is_open_now
                arropen.push(h)
            });
            await Hour.query().where('business_id', b.id).delete()
            await b.related('hours').createMany(arropen)
        }
        return q
    }

    async deleteBusiness(id: number) {
        const q = await Business
            .query()
            .where('id', id)
            .preload('photo')
            .first()
        if (q!.photo.length > 0) {
            q?.photo.forEach(async e => {
                const file = app.makePath('uploads', e.label)
                await unlink(file)
                return
            });
        }
        const imageName = path.basename(q!.image_url);
        const file = app.makePath('uploads', imageName)
        await unlink(file)
        await Business.query().where('id', q!.id).delete()
        return q
    }
}