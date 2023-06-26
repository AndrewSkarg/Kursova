module.exports = (sequelize, Sequelize) => {
    const Portion = sequelize.define("Portion", {
        portion_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        dayNumForeign: { //foreignKey
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Days',
                key: 'day'
            }
        },

        portionDrinkForeign: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Components',
                key: 'component_id'
            }
        }
    },
        {
            timestamps: false
        });
    Portion.associate = function (models) {
        Portion.hasMany(models.Dish,
            {
                foreignKey: 'portionForeign'
            }
        );

        
        Portion.belongsTo(models.Component,
            {
                foreignKey: 'portionDrinkForeign'
            }
        );

        Portion.belongsTo(models.Day,
            {
                foreignKey: 'dayNumForeign'
            }
        ); //!!МАКСИМУМ ДЕНЬ ПОВТОРЮЄТЬСЯ 3 РАЗИ У ТАБЛИЦІ Portion
        // Portion.belongsTo(mo els.Day, {as: 'afternoonPortion'});
        // Portion.belongsTo(models.Day, {as: 'eveningPortion'});

    };

    return Portion;
};