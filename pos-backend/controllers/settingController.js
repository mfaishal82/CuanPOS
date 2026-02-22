const imageKit = require("../helpers/imagekit");
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
      // console.log(req.body);
      const setting = await Setting.findOne();

      let checkType = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
      const maxSizeMB = 2;
      const maxSizeByte = maxSizeMB * 1024 * 1024;
      //  1 MB = 1024 KB dan 1 KB = 1024 bytes
      // 1 MB = 1024 KB = 1024 × 1024 bytes = 1,048,576 bytes

      console.log(req.file);
      if (req.file) {
        if (!checkType.includes(req.file.mimetype)) {
          throw { name: "BadRequest" };
        }

        if (req.file.size > maxSizeByte) {
          throw new Error("File size too big. Max 2MB");
        }
      }

      try {
        const url = imageKit.helper.buildSrc({
          urlEndpoint: "https://ik.imagekit.io/myfiles",
          src: "/products/Cfasfsgfsa-shopImage_ZAs-Uf_nG.jpg",
        });
        console.log(url);
        await imageKit.files.delete(url);
        // console.log("Old image deleted");
      } catch (err) {
        console.log("Old image not found or error deleting:", err.message);
      }

      const response = await imageKit.files.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `${shopName}-shopImage.jpg`,
        folder: "/products",
      });

      // console.log(setting);
      if (!setting) {
        await Setting.create({
          shopName,
          email,
          phone,
          address,
          logo: response.url,
        });
      } else {
        await setting.update({
          shopName,
          email,
          phone,
          address,
          logo: response.url,
        });
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
