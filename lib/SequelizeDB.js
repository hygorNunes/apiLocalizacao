// SequelizeDB
import Sequelize from 'sequelize';
import User from '../src/models/User'
import Person from '../src/models/Person'
import Profile from '../src/models/Profile'
import Plan from '../src/models/Plan'
import Account from '../src/models/Account'

var db = {}
let sequelize = null
const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    //   $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    //   $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    //   $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    //   $iRegexp: Op.iRegexp,
    //   $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    //   $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    //   $adjacent: Op.adjacent,
    //   $strictLeft: Op.strictLeft,
    //   $strictRight: Op.strictRight,
    //   $noExtendRight: Op.noExtendRight,
    //   $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    //   $or: Op.or,
    //   $any: Op.any,
    //   $all: Op.all,
    //   $values: Op.values,
    //   $col: Op.col
};

class SequelizeDB {
    constructor(host) {
        this.url = host
    }

    connect(host) {
        sequelize = new Sequelize(this.url);
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        sequelize.sync({ logging: console.log })

        // Init Models
        const models = {
            User: User.init(sequelize, Sequelize),
            Profile: Profile.init(sequelize, Sequelize),
            Person: Person.init(sequelize, Sequelize),
            Plan: Plan.init(sequelize, Sequelize),
            Account: Account.init(sequelize, Sequelize)
        }

        Object.values(models)
            .filter(model => typeof model.associate === "function")
            .forEach(model => model.associate(models));

        db = {
            ...models,
            sequelize
        };

        module.exports = db;
    }

    static close() {
        sequelize.close()
    }

}

export default SequelizeDB