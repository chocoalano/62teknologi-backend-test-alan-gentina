import vine from '@vinejs/vine'

export const businessCreateValidator = vine.compile(
    vine.object({
        display_phone: vine.string(),
        distance: vine.number(),
        is_claimed: vine.boolean(),
        is_closed: vine.boolean(),
        date_opened: vine.date({
            formats: ['YYYY-MM-DD', 'x']
        }),
        date_closed: vine.date({
            formats: ['YYYY-MM-DD', 'x']
        }),
        name: vine.string(),
        phone: vine.string(),
        price: vine.string(),
        rating: vine.number().min(1).max(5),
        review_count: vine.number(),
        transactions: vine.string(),
        coordinate: vine.object({
            latitude: vine.number(),
            longitude: vine.number(),
        }),
        location: vine.object({
            address1: vine.string(),
            address2: vine.string(),
            address3: vine.string(),
            city: vine.string(),
            country: vine.string(),
            state: vine.string(),
            zip_code: vine.string(),
        }),
        attribute: vine.object({
            business_temp_closed: vine.number(),
            outdoor_seating: vine.boolean(),
            liked_by_vegans: vine.boolean(),
            liked_by_vegetarians: vine.boolean(),
            hot_and_new: vine.date({
                formats: ['YYYY-MM-DD', 'x']
            }),
        }),
        photos: vine.array(
            vine.object({
                url: vine.string(),
                caption: vine.string(),
                width: vine.number(),
                height: vine.number(),
                is_user_submitted: vine.boolean(),
                user_id: vine.number().optional(),
                label: vine.string(),
                image: vine.file({
                    size: '2mb',
                    extnames: ['jpg', 'png', 'pdf']
                }).optional()
            })
        ).minLength(1),
        category: vine.array(vine.number()).minLength(1),
        open_hours: vine.array(vine.object({
            open_id: vine.number(),
            hours_type: vine.string(),
            is_open_now: vine.boolean(),
        })).minLength(1)
    })
)