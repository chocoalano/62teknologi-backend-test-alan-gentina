import User from "#models/user";
import hash from '@adonisjs/core/services/hash'
import BaseRepository from "../../BaseRepository.js";
import db from "@adonisjs/lucid/services/db";

export default class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async login(input: { email: string; password: string; }) {
        const u = await User.findBy('email', input.email)
        if (!u) {
            return null
        }
        const verify = await hash.verify(u!.password, input.password)
        if (!verify) {
            return null
        }
        const user = await User.verifyCredentials(input.email, input.password)
        const token = await User.authTokens.create(user)
        return token
    }

    async logout(userId: number) {
        const user = await User.find(userId)
        const token = await db.from('auth_access_tokens').where('tokenable_id', user!.id).delete()
        return token
    }
}