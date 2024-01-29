import type { HttpContext } from '@adonisjs/core/http'
import UserRepository from '../Repositories/Packages/Users/UserRepository.js';
import { loginValidator, registerValidator, updateProfileValidator } from '#validators/auth';

export default class AuthController {
  private repo: any;
  constructor() {
    this.repo = new UserRepository();
  }
  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response }: HttpContext) {
    try {
      const input = request.all()
      if (params.option === 'login') {
        const payload = await loginValidator.validate(input)
        const login = await this.repo.login(payload)
        return response.ok(login)
      }
      if (params.option === 'register') {
        const payload = await registerValidator.validate(input)
        const regist = await this.repo.store(payload)
        return response.ok(regist)
      }
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  /**
   * Show individual record
   */
  async show({ auth, response }: HttpContext) {
    try {
      const u = await this.repo.find(auth.user!.id)
      return response.ok(u)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ response, request, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(
        updateProfileValidator,
        {
          meta: {
            id: auth.user!.id
          }
        }
      )
      const u = await this.repo.update(auth.user!.id, payload)
      return response.ok(u)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  /**
   * Delete record
   */
  async logout({ response, auth }: HttpContext) {
    try {
      const logout = await this.repo.logout(auth.user!.id)
      return response.ok(logout)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}