const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');
const { Op } = require('sequelize')

class UserController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body
      // console.log(req.body)

      if (!username || !password) {
        throw { name: "BadRequest", message: "Username and password are required" }
      }

      let user = await User.findOne({
        where: {
          username
        }
      })

      if(!user || !comparePassword(password, user.password)) {
        throw { name: "Unauthorized", message: "Invalid username or password"}
      }

      const token = signToken({
        id:user.id,
        username: user.username,
      })

      res.cookie(
        'token', token, {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
          secure: false,
          sameSite: 'none',
          // domain: process.env.FRONTEND_URL
          // domain: 'mydomain.com' || '.vercel.app'
        }
      )

      res.status(200).json({ message: "Login Success" })
    } catch (error) {
      // res.status(500).json({message: "error test"})
      next(error);
    }
  }

  static async logout(req, res, next){
    try{
      res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        // domain: process.env.FRONTEND_URL
      })

      res.status(200).json({
        message: "Logout success"
      })
    }catch(error){
      next(error)
    }
  }

  static async createUser(req, res, next) {
    try {
      const { name, username, password, role } = req.body;

      // console.log(req.body)
      const newUser = await User.create({
        name, username, password, role
      })

      // console.log(newUser)

      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        role: newUser.role
      })
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req, res, next) {
    try{
      const id = req.user.id
      if(!id) throw { name: "NotFound" }

      const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'username', 'role']
      })
      if(!user) throw { name: "NotFound" }

      res.status(200).json(user)
    }catch(error){
      next(error)
    }
  }

  static async getUsers(req, res, next){
    try{
      let { page, limit, searchUser } = req.query
      page = parseInt(page) || 1
      limit = parseInt(limit) || 10
      let offset = (page - 1) * limit

      let option = searchUser ? {
        [Op.or]: [{
          name: {
            [Op.iLike]: `%${searchUser}%`
          }
        }, {
          username: {
            [Op.iLike]: `%${searchUser}%`
          }
        }]
      } : {}

      const { count, rows } = await User.findAndCountAll({
        attributes: {
          exclude: ['password']
        },
        where: option,
        offset,
        limit
      })

      res.status(200).json({
        message: `Success get ` + searchUser ? searchUser : 'all users',
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit)
        },
        data: rows
      })
    }catch(error){
      next(error)
    }
  }

  static async editUserById(req, res, next){
    try{
      const id = req.params.id
      const { name, username, password, status, role } = req.body

      const user = await User.findByPk(id)
      if(!user) throw { name: "NotFound" }

      await user.update({ name, username, password, status, role })

      res.status(200).json({
        message: `Success update data for ${user.username}`
      })
    }catch(error){
      next(error)
    }
  }

  static async deleteUserById(req, res, next) {
    try{
      const id = req.params.id

      const user = await User.findByPk(id)
      if(!user) throw { name: "NotFound" }

      await user.destroy()

      res.status(200).json({
        message: "Delete user success"
      })
    }catch(error){
      next(error)
    }
  }
}

module.exports = UserController;
