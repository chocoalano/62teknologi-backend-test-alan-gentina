import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(5),
    })
)
export const registerValidator = vine.compile(
    vine.object({
        fullName: vine.string(),
        email: vine.string().email().use(
            uniqueRule({
                table: 'users', column: 'email'
            })
        ),
        password: vine.string().minLength(5).confirmed(),
    })
)
export const updateProfileValidator = vine.compile(
    vine.object({
        fullName: vine.string(),
        email: vine.string().use(
            uniqueRule({
                table: 'users', column: 'email'
            })
        ),
        password: vine.string().minLength(5).confirmed(),
    })
)