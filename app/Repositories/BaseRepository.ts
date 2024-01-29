export default class BaseRepository {
    private model: any;
    constructor(model: any) {
        this.model = model;
    }

    async pagination(input: { page: number; limit: number; search: string; }, colSearch: string) {
        const { page, limit, search } = input
        const count = await this.model.query().where(colSearch, 'LIKE', '%' + search + '%').count('* as total')
        let total = limit < 0 ? count[0].$extras.total : limit
        const q = await this.model.query()
        .where(colSearch, 'LIKE', '%' + search + '%')
        .paginate(page, total)
        return q
    }

    async all() {
        return await this.model.all()
    }

    async store(data: any) {
        const q = new this.model
        q.merge(data)
        await q.save()
        return q
    }

    async find(id: number) {
        const q = await this.model.find(id)
        if (!q) {
            return null
        }
        return q
    }
    async findBy(column: string, value: string | number) {
        const q = await this.model.findBy(column, value)
        if (!q) {
            return null
        }
        return q
    }

    async update(id: number, data: any) {
        const q = await this.model.find(id)
        if (!q) {
            return null
        }
        q.merge(data)
        await q.save()
        return q
    }

    async delete(id: number) {
        const q = await this.model.find(id);
        if (!q) {
            return null
        }
        await q.delete();
        return q
    }
}