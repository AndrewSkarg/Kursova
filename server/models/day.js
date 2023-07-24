module.exports = (sequelize, Sequelize) => {
  const Day = sequelize.define("Day", {
    day: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    dayName:{
      type:Sequelize.STRING,
      allowNull:false
    },
  },
    {
      timestamps: false
    });
  Day.associate = function (models) {
    Day.hasMany(
      models.Portion,
      {
        foreignKey:'dayF',
        as: 'por'
      });

  };

  return Day;
};