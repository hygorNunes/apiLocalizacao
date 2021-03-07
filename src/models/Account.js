import { Sequelize } from 'sequelize'

/**
 * @typedef Account
 * @property { Plan } plan_id.required
 * @property { User } user_id.required
 */
class Account extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                token: {
                    type: DataTypes.STRING(255),
                    unique: true,
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                }
            },
            { 
                tableName: "accounts",
                modelName: "account",
                underscored: true,
                sequelize 
            }
        );
    }
    static associate(models) {
        this.myAssociation = this.belongsTo(models.Plan, { foreignKey: { allowNull: false } });
        this.myAssociation = this.belongsTo(models.User, { foreignKey: { allowNull: false } });
    }
}

export default Account