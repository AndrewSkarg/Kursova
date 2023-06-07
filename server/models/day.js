module.exports = (sequelize, Sequelize) => {
  const Day = sequelize.define("Day", {
    day: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      //allowNull: false
    },
    dayName:{
      type:Sequelize.STRING,
      allowNull:false
    },
    morningPortion: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    afternoonPortion: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    eveningPortion: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }

  },

    {
      timestamps: false
    });
  Day.associate = function (models) {
    Day.hasMany(
      models.Portion,
      {
        foreignKey:'dayNumForeign',
        as: 'por'
      });

  };

  return Day;
};