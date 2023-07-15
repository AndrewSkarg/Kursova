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
            unique: true

        },

        kind: {
            type: Sequelize.ENUM('перше', 'друге', 'салат', 'десерт'),
            allowNull: true,
        },


    }, {
        timestamps: false
    });
    Dish.associate = function (models) {

        Dish.belongsToMany(models.Component,
            {
                through: models.DishComponent,
                foreignKey: 'dishF',
                otherKey: 'componentF'
            });

        // Dish.hasMany(models.DishComponent,
        //     {
        //         foreignKey: 'dishF'
        //     }
        // );

        // Dish.belongsTo(models.Portion,
        //     {
        //         foreignKey: 'portionForeign'

        //     }
        // );


        Dish.hasMany(models.Portion,
            {
                as: 'firstDishesOfPortions',
                foreignKey: 'firstDishF'
            }
        );

        Dish.hasMany(models.Portion,
            {
                as: 'secondDishesOfPortions',
                foreignKey: 'secondDishF'
            }
        );

        Dish.hasMany(models.Portion,
            {
                as: 'dessertsOfPortions',
                foreignKey: 'dessertDishF'
            }
        );

        Dish.hasMany(models.Portion,
            {
                as: 'saladsOfPortions',
                foreignKey: 'saladDishF'
            }
        );
        // User.hasMany(models.Role);
        // User.hasMany(models.Position);saladDishF
    };

    return Dish;
};