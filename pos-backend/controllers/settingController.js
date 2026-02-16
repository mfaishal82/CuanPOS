const { Setting } = require("../models");

class SettingController {
  static async getSetting(req, res, next) {
    try {
      const setting = await Setting.findAll();

      res.status(200).json(setting);
    } catch (error) {
      next(error);
    }
  }

  static async setting(req, res, next) {
    try {
      const { shopName, email, phone, address, logo } = req.body;

      const setting = await Setting.findOne();
      // console.log(setting);
      if (!setting) {
        await Setting.create({ shopName, email, phone, address, logo });
      } else {
        await setting.update({ shopName, email, phone, address, logo });
      }

      res.status(200).json({
        message: "Setting saved successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SettingController;
