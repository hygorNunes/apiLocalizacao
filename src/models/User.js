import { Sequelize } from 'sequelize'

/**
 * @typedef User
 * @property { string } email.required
 * @property { string } pass.required
 * @property { boolean } active.required
 * @property { Person } person_id.required
 * @property { Array.<Account> } accountList
 */
class User extends Sequelize.Model{
    static init(sequelize, DataTypes) {
        return super.init(
            {
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    // unique: true,
                    validade: {
                        isEmail: true,
                    }
                },
                pass: {
                    type: DataTypes.STRING(45),
                    allowNull: false
                },
                token: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    // unique: true,
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                }
            },
            { 
                tableName: "users",
                modelName: "user",
                underscored: true,
                sequelize 
            }
        );
    }
    static associate(models) {
        this.myAssociation = this.belongsTo(models.Person, { foreignKey: { allowNull: false } })
        this.myAssociation = this.belongsTo(models.Profile, { foreignKey: { allowNull: false } })
        this.myAssociation = this.hasMany(models.Account);
    }
}

export default User