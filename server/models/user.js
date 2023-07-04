module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
            allowNull: false,
            unique:true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    });
    User.associate = function (models) {
        User.belongsToMany(models.Role,
            {
                through: models.UserRole,
                foreignKey:'user',
                otherKey:  'role'
            }
        );
        // User.hasMany(models.UserRole,
        //     {
        //         foreignKey: 'user'
        //     }
        // );
        User.hasOne(models.Position,
            {
                foreignKey: 'user'
            }
        );
    };

    return User;
};