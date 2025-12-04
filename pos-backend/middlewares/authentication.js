const { User } = require("../models")
const { verifyToken } = require("../helpers/jwt")

async function Authentication(req, res, next) {
  console.log("AUTHENTICATION MIDDLEWARE JALAN")
  try {
    const accessToken = req.headers.authorization
    if(!accessToken) {
      throw { name: "Unauthorized" }
    }

    const [type, token] = accessToken.split(" ")
    if(type !== "Bearer") {
      throw { name: "Unauthorized" }
    }

    const payload = verifyToken(token)
    console.log(payload)
    const user = await User.findByPk(payload.id)
    console.log("user.role:", user.role)

    if(!user) {
      throw { name: "Unauthorized" }
    }

    req.user = {
      id: user.id,
      username: user.username,
      role: user.role
    }
    next()
  } catch(error) {
    next(error)
  }
}

module.exports = Authentication
