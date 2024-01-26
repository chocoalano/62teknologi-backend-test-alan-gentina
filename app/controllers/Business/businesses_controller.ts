import type { HttpContext } from '@adonisjs/core/http'

export default class BusinessesController {
    /**
   * Handle form submission for the create action
   */
    async index({ request }: HttpContext) {
        return request.all()
    }

    /**
   * Handle form submission for the create action
   */
    async store({ request }: HttpContext) {
        return request.all()
    }

    /**
     * Show individual record
     */
    async show({ params }: HttpContext) {
        return params.all()
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request }: HttpContext) {
        const param = params.all()
        const input = request.all()
        return { param, input }
    }

    /**
     * Delete record
     */
    async destroy({ params }: HttpContext) {
        return params.all()
    }
}