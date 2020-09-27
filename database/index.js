const { Sequelize } = require('sequelize');

const { databaseConfig } = require('../configs/');

const sequelize = new Sequelize(databaseConfig[process.env.NODE_ENV]);

const modelDefiners = [
	require('./models/timetable.model')
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

module.exports = sequelize;