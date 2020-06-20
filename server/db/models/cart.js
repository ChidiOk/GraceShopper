const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    allownNull: false,
    validate: {
      min: 0
    },
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER
    // allowNull: false
  }
})

module.exports = Cart
