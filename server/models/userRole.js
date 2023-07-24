module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("UserRole", {
        user: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'user_id'
            },
        allowNull:false
        },
        role:{
            type: Sequelize.INTEGER,
            references: {
                model: 'Roles',
                key: 'role_id'
            },
            allowNull:false

        }
    },
        {
            timestamps: false
        });
   

    return UserRole;
};