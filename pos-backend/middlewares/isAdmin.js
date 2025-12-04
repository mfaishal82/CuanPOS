const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

async function isAdmin(req, res, next) {
  try{
    const accessToken = req.headers.authorization
    if(!accessToken) throw { name: "Unauthorized" }

    const [type, token] = accessToken.split(" ")
    if(type !== "Bearer") throw { name: "Unauthorized" }

    const payload = verifyToken(token)
    const user = await User.findByPk(payload.id)

    if(user.role !== "admin") throw { name: "Unauthorized" }
    next()
  }catch(error){
    next(error)
  }
}

module.exports = isAdmin
