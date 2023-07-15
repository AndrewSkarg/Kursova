// const { Model } = require("sequelize");

// const Component = require("./component");
// const Dish = require("./dish");

module.exports = (sequelize, Sequelize) => {
    const DishComponent = sequelize.define("DishComponent", {
        dishF: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Dishes',
                key: 'dish_id'
            }
        },
        componentF: {
            type:Sequelize.INTEGER,
            references:{
                model: 'Components',
                key: 'component_id'
            }
        },

        countOfComp:{
            type:Sequelize.DECIMAL(4,3),
        }
        
    }, {
        timestamps:false
    });

    return DishComponent;
};