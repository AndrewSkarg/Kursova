'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
console.log('baseName: ', basename);
console.log('dirName: ', __dirname);
let sequelize;
if (config.use_env_variable) {
// {...config,logging:false}
    sequelize = new Sequelize(process.env[config.use_env_variable],{...config,logging:false});
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, {...config,logging:false});
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {

        const model = require(path.join(__dirname, file))(sequelize,
            Sequelize.DataTypes);
        db[model.name] = model;
    });
    
if (db.User.associate) {
    db.User.associate(db);
}

if (db.UserRole.associate) {
    db.UserRole.associate(db);
}

// Then, associate the Role model
if (db.Role.associate) {
    db.Role.associate(db);
}

// Finally, associate any other models
Object.keys(db).forEach(modelName => {
    if (modelName !== 'User' && modelName !== 'UserRole' && modelName !== 'Role') {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;