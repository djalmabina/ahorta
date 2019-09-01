const bcrypt = require('bcrypt-nodejs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    provider: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    website: DataTypes.STRING,
    language: DataTypes.STRING,
    country: DataTypes.STRING,
    profile_url: DataTypes.STRING,
    picture_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Device)
      },
      generateHash: (password) => {
        /* eslint-disable no-sync */
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      }
    },
    instanceMethods: {
      verifyPassword: (password, databasePassword) => {
        return bcrypt.compareSync(password, databasePassword)
      }
    },
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] }
      }
    }
  })
  return User
}