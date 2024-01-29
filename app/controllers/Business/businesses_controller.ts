import type { HttpContext } from '@adonisjs/core/http'
import { businessCreateValidator } from '#validators/business';
import BusinessRepository from '../../Repositories/Packages/Business/BusinessRepository.js';
export default class BusinessesController {
    private repo: any;
    constructor() {
        this.repo = new BusinessRepository();
    }
    /**
   * Handle form submission for the create action
   */
    async index({ request, response }: HttpContext) {
        try {
            const input = request.all()
            const u = await this.repo.paginationBusiness(input)
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
            const payload = await businessCreateValidator.validate(request.all())
            const photos = request.allFiles().photos
            const img_file = request.file('image')
            const q = await this.repo.storeBusiness(payload, photos, img_file)
            return response.ok(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    /**
     * Show individual record
     */
    async show({ request, response }: HttpContext) {
        try {
            const q = await this.repo.showBusiness(request.param('id'))
            return response.ok(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ request, response }: HttpContext) {
        try {
            const payload = await businessCreateValidator.validate(request.all())
            const photos = request.allFiles().photos
            const img_file = request.file('image')
            const q = await this.repo.updateBusiness(request.param('id'), payload, photos, img_file)
            return response.ok(q)
        } catch (error) {
            console.log(error);
            
            return response.status(error.status).send(error)
        }
    }

    /**
     * Delete record
     */
    async destroy({ request, response }: HttpContext) {
        try {
            const q = await this.repo.deleteBusiness(request.param('id'))
            return response.ok(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}