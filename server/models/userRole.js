module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("UserRole", {
        user: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'user_id'
            }
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
           // primaryKey: true,
            timestamps: false
        });
   

    return UserRole;
};