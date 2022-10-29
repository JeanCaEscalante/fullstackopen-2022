require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET
let MONGODB_URI = process.env.MONGODB_URI


module.exports = { MONGODB_URI, JWT_SECRET }