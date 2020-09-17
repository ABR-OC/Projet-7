
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../config/db')

/* Model message */
class Post extends Model{}
Post.init({
   // Paramètres
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true,
  modelName: 'posts',
  sequelize
});  

Post.sync()

module.exports = Post

