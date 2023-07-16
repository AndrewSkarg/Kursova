module.exports = (sequelize, Sequelize) => {
    const { Op } = require('sequelize');
    const Portion = sequelize.define("Portion", {
        portion_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        order: {
            type: Sequelize.ENUM('сніданок', 'обід', 'вечеря'),
            allowNull: false,
        },

        dayF: { //foreignKey
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Days',
                key: 'day'
            }
        },

        portionDrinkF: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Components',
                key: 'component_id'
            }
        },
        
        firstDishF: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Dishes',
                key: 'dish_id'
            }
        },

        secondDishF: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Dishes',
                key: 'dish_id'
            }
        },


        dessertDishF: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Dishes',
                key: 'dish_id'
            }
        },
        saladDishF: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Dishes',
                key: 'dish_id'
            }
        }
    },
        {
            timestamps: false
        });
    Portion.associate = function (models) {



        Portion.belongsTo(models.Component,
            {
                foreignKey: 'portionDrinkF'
            }
        );

        Portion.belongsTo(models.Dish,
            {
                foreignKey: 'firstDishF',
                constraints: true,
                scope: {
                    kind:
                    {
                        [Op.eq]: 'перше'
                    },
                },
            }

        );

        Portion.belongsTo(models.Dish,
            {
                foreignKey: 'secondDishF',
                constraints: true,
                scope: {
                    kind:
                    {
                        [Op.eq]: 'друге'
                    },
                },
            }
        );

        Portion.belongsTo(models.Dish,
            {
                foreignKey: 'dessertDishF',
                constraints: true,
                scope: {
                    kind:
                    {
                        [Op.eq]: 'десерт'
                    },
                },
            }
        );

        Portion.belongsTo(models.Dish,
            {
                foreignKey: 'saladDishF',
                constraints: true,
                scope: {
                    kind:
                    {
                        [Op.eq]: 'салат'
                    },
                },
            }
        );

        Portion.belongsTo(models.Day,
            {
                foreignKey: 'dayF'
            }
        ); //!!МАКСИМУМ ДЕНЬ ПОВТОРЮЄТЬСЯ 3 РАЗИ У ТАБЛИЦІ Portion
        // Portion.belongsTo(mo els.Day, {as: 'afternoonPortion'});
        // Portion.belongsTo(models.Day, {as: 'eveningPortion'});

    };

    return Portion;
};