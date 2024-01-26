import vine from '@vinejs/vine'

const categoryValidator = vine.compile(
    vine.object({
        alias: vine.string(),
        title: vine.string(),
    })
)
export default categoryValidator