import { Sequelize } from 'sequelize'

/**
 * @typedef Person
 * @property { string } name.required
 * @property { date } birthday
 * @property { string } rg
 * @property { string } cpf
 * @property { string } picture
 * @property { enum[M,F] } genre
 */
class Person extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING(100)
                },
                birthday: {
                    type: DataTypes.DATEONLY,
                    allowNull: true,
                },
                genre: {
                    type: DataTypes.ENUM('M', 'F'),
                    allowNull: true
                },
                rg: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                cpf: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                picture: {
                    type: DataTypes.BLOB
                },
                phone_mobile: {
                    type: DataTypes.STRING(15)
                },
                phone_other: {
                    type: DataTypes.STRING(15)
                }
            },
            { 
                tableName: "persons",
                modelName: "person",
                underscored: true,
                sequelize 
            }
        );
    }
    static associate(models) {
        
    }
}

export default Person