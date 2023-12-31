module.exports = (sequelize, Sequelize) => {
    const Position = sequelize.define("Position", {
        position_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rank: {
            type: Sequelize.ENUM('солдат','сержант','лейтенант','майор','підполковник','полковник'),
            allowNull: false
        },
        user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model:'Users',
                key:'user_id'
            }

        }
    },
        {
            timestamps: false
        });
    Position.associate = function (models) {
        Position.belongsTo(models.User,
            {
                foreignKey: 'user'
            }
        );
    };

    return Position;


}