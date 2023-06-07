// const { Model } = require("sequelize");

// const Component = require("./component");
// const Dish = require("./dish");

module.exports = (sequelize, Sequelize) => {
    const DishComponent = sequelize.define("DishComponent", {
        dishForeign: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Dishes',
                key: 'dish_id'
            }
        },
        componentForeign: {
            type:Sequelize.INTEGER,
            references:{
                model: 'Components',
                key: 'component_id'
            }
        }
        
    }, {
        timestamps:false
    });

    return DishComponent;
};