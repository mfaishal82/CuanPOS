const { User } = require("../models")
const { verifyToken } = require("../helpers/jwt")

async function Authentication(req, res, next) {
  try {
    const accessToken = req.headers.authentication
    if(!accessToken) {
      throw { name: "Unauthorized" }
    }

    const [type, token] = accessToken.split(" ")
    if(type !== "Bearer") {
      throw { name: "Unauthorized" }
    }

    const payload = verifyToken(token)
    const user = await User.findByPk(payload.id)

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
