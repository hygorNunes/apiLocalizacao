import { Sequelize } from 'sequelize'

/**
 * @typedef Plan
 * @property { string } name.required
 * @property { decimal } price.required
 * @property { boolean } active.required
 * @property { Array.<Account> } accountList
 */
class Plan extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                    unique: true,
                },
                price: {
                    type: DataTypes.DECIMAL(6,2),
                    allowNull: false,
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                }
            },
            { 
                tableName: "plans",
                modelName: "plan",
                underscored: true,
                sequelize 
            }
        );
    }
    static associate(models) {
        this.myAssociation = this.hasMany(models.Account);
    }
}

export default Plan