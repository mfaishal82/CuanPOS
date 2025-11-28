const { sign, verify } = require("jsonwebtoken")
const secret = process.env.JWT_SECRET

module.exports = {
  signToken : (payload) => sign(payload, secret, { expiresIn: '7d' }),
  verifyToken : (token) => verify(token, secret)
}
