import type { HttpContext } from '@adonisjs/core/http'
import CategoryRepository from '../../Repositories/Packages/Business/CategoryRepository.js';
import categoryValidator from '#validators/category';

export default class CategoriesController {
  private repo: any;
  constructor() {
    this.repo = new CategoryRepository();
  }
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    try {
      const input = request.all()
      const u = await this.repo.pagination(input, 'title')
      return response.ok(u)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await categoryValidator.validate(request.all())
      const q = await this.repo.store(payload)
      return response.ok(q)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const q = await this.repo.find(params.id)
      return response.ok(q)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await categoryValidator.validate(request.all())
      const u = await this.repo.update(params.id, payload)
      return response.ok(u)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const u = await this.repo.delete(params.id)
      return response.ok(u)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}