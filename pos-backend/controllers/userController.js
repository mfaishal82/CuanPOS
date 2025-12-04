const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

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

      res.status(200).json({acessToken: token})
    } catch (error) {
      // res.status(500).json({message: "error test"})
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { name, username, password, role } = req.body;

      console.log(req.body)
      const newUser = await User.create({
        name, username, password, role
      })

      console.log(newUser)

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

  static async getUsers(req, res, next){
    try{
      const users = await User.findAll({
        attributes: {
          exclude: ['password']
        }
      })

      res.status(200).json(users)
    }catch(error){
      next(error)
    }
  }
}

module.exports = UserController;
