import { Sequelize } from 'sequelize'

/**
 * @typedef Profile
 * @property { string } name.required
 * @property { string } description.required
 * @property { boolean } active.required
 * @property { Profile } profile_id.required
 */
class Profile extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                    unique: true,
                },
                description: {
                    type: DataTypes.STRING(300),
                    allowNull: true
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
            },
            { 
                tableName: "profiles",
                modelName: "profile",
                underscored: true,
                sequelize 
            }
        );
    }
    static associate(models) {
        this.myAssociation = this.belongsTo(models.Profile, { foreignKey: { allowNull: true}, as: 'pai'  });
    }
}

export default Profile