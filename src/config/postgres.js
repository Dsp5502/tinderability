const { Sequelize } = require('sequelize');

const database = process.env.POSTGRES_DATABASE;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  port: 5432,
});

const dbConnectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  sequelize,
  dbConnectPostgres,
};
