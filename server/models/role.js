//const db = require("./index");

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('Role', {
        role_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        name: { type: Sequelize.ENUM('споживач','повар','шеф'), allowNull: false },
    }, {
        timestamps: false
    });

    Role.associate = function (models) {
        Role.belongsToMany(models.User,
            {
                through: models.UserRole,
                foreignKey:'role',
                otherKey:  'user'
            }
        );
        // Role.hasMany(models.UserRole,
        //     {
        //         foreignKey: 'role'
        //     }
        // )

    };

   
    return Role;
};