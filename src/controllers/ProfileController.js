import AbstractController from './AbstractController'
import ProfileRepository from '../repositories/ProfileRepository'
import Profile from '../models/Profile'
import SequelizeDB from '../../lib/SequelizeDB'

const repository = new ProfileRepository()

class ProfileController extends AbstractController {
    constructor() {
        super()
    }

    list(req, res){
        super.list(req, res, repository)
    }

    create(req, res) {
        super.create(req, res, repository)
    }

    update(req, res) {
        super.update(req, res, repository)
    }

    delete(req, res) {
        super.delete(req, res, repository)
    }

    async verificaToken(token){
        return await Profile.findOne({
            where: { 
                token: token 
            } 
        })
        .then( Profile => { 
            return Profile 
        })
        .catch( error => {
            console.log(error)
        })
    }

}

export default ProfileController