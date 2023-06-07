module.exports = (sequelize, Sequelize) => {
    const Dish = sequelize.define("Dish", {
        dish_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        portionForeign: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                key: 'portion_id',
                model: 'Portions'
            }
        }

    }, {
        timestamps: false
    });
    Dish.associate = function (models) {

        Dish.belongsToMany(models.Component,
            {
                through: models.DishComponent,
                foreignKey:'dishForeign',
                otherKey:'componentForeign'
            });

        // Dish.hasMany(models.DishComponent,
        //     {
        //         foreignKey: 'dishForeign'
        //     }
        // );

        Dish.belongsTo(models.Portion,
            {
                foreignKey: 'portionForeign'

            }
        );
        // User.hasMany(models.Role);
        // User.hasMany(models.Position);
    };

    return Dish;
};