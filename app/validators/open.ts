import vine from '@vinejs/vine'

const openValidator = vine.compile(
    vine.object({
        is_overnight: vine.boolean(),
        start: vine.number(),
        end: vine.number(),
        day: vine.number(),
    })
)
export default openValidator