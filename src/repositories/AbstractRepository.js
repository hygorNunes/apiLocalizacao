class AbstractRepository {
    constructor(model) {
        if (new.target === AbstractRepository) {
            throw new TypeError("Cannot construct Abstract instances directly")
        }
        this.model = model
    }

    async list(params) {
        let order = params.order != null ? params.order : 'id'
        let sort = params.sort != null ? params.sort : 'DESC'

        delete params.order
        delete params.sort

        const paginate = this.getPagination(params)
        return await this.model.findAndCountAll({
            where: params,
            order: [
                [order, sort]
            ],
            include: this.getIncludes(this.model.associations),
            offset: paginate.offset,
            limit: paginate.perPage
        })
    }

    async get(id) {
        return await this.model.findByPk(id, { include: this.getIncludes(this.model.associations) }).then(async (data) => {
            return await data.get()
        }).catch(e => {
            return { message: 'Error: ' + e.message }
        })
    }

    async findAll(atributes, params) {
        return await this.model.findAll({
            atributes: atributes,
            include: this.getIncludes(this.model.associations),
            where: params
        })
    }

    async create(data) {
        return await this.model.create(data, { include: this.getIncludes(this.model.associations) }).then(async (data) => {
            return await data.get()
        }).catch(e => {
            console.error(e)
            return { message: 'Error: ' + e.message }
        })
    }

    async update(id, data) {
        return await this.model.update(
            data, {
            where: {
                id: id
            },
            include: this.getIncludes(this.model.associations)
        }
        ).then(async (dataReturn) => {
            return await data.get()
        }).catch(e => {
            return { message: 'Error: ' + e.message }
        })
    }

    async delete(id) {
        return await this.model.destroy({
            where: {
                id: id
            }
        }).then(async (data) => {
            return true
        }).catch(e => {
            return { message: 'Error: ' + e.message }
        })
    }

    getPagination(params) {
        if (params) {
            console.log('Teste')
            let page = params.page != null ? parseInt(params.page) : 1
            let perPage = params.perPage != null ? params.perPage > 25 ? 25 : parseInt(params.perPage) : 25
            let offset = (page - 1) * perPage

            delete params.page
            delete params.perPage

            return {
                page: page,
                perPage: perPage,
                offset: offset
            }
        } else {
            return {
                page: 1,
                perPage: 25,
                offset: 0
            }
        }
    }

    getIncludes(associations) {
        const result = [];

        Object.keys(this.model.associations).forEach((key) => {
            result.push(key.toString());
        });
        return result
    }

}

export default AbstractRepository