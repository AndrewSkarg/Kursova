module.exports = (sequelize, Sequelize) => {
    const Dessert = sequelize.define("Dessert", {
        dessert_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        portionForeign: {
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: true,
            references: {
                key: 'portion_id',
                model: 'Portions'
            }
        }

    }, {
        timestamps: false
    });
    Dessert.associate = function (models) {
        Dessert.belongsTo(models.Portion,
            {
                foreignKey:'portionForeign'
            }
        );
    };

    return Dessert;
};