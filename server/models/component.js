module.exports = (sequelize, Sequelize) => {
    const Component = sequelize.define("Component", {
        component_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        count: {
            type:Sequelize.DECIMAL(6,3),
            allowNull: false
        },
        priceForUnit: {
            type: Sequelize.DECIMAL(6, 3),
            allowNull: false
        },
        unit: {
            type: Sequelize.ENUM('кг', 'л', 'шт'),
            allowNull: false
        },
        description: {
            type: Sequelize.ENUM('крупи', 'овочі', 'фрукти', 'напої', 'інше','спеції'),
            allowNull: false

        },

    }, {
        timestamps: false
    });
    Component.associate = function (models) {
        Component.belongsToMany(models.Dish,
            {
                through: models.DishComponent,
                foreignKey:'componentF',
                otherKey:'dishF'
            }
        );
        Component.hasMany(models.Portion,
            {
                foreignKey: 'portionDrinkF'
            }
        );
    };

    return Component;
};