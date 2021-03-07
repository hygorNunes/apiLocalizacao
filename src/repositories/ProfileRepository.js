import Profile from '../models/Profile'
import AbstractRepository from './AbstractRepository'

class ProfileRespository extends AbstractRepository{
    constructor(){
        super(Profile)
    }

}

export default  ProfileRespository