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
            validate: {
                notEmpty: true,
                notContains: ' ',
                len: [3, 20] 
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notContains: ' ',
                len: [3, 20] 
            }
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notContains: ' '
            }
        }
    }, {
        timestamps: false
    });
    User.associate = function (models) {
        User.belongsToMany(models.Role,
            {
                through: models.UserRole,
                foreignKey: 'user',
                otherKey: 'role'
            }
        );
        
        User.hasOne(models.Position,
            {
                foreignKey: 'user'
            }
        );
    };

    return User;
};