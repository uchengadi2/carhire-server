const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const languageController = require("./../controllers/languageController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/images/languages" });

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(languageController.getAllLanguages)
  .post(
    authController.protect,
    authController.restrictTo("admin","user","creator"),
    languageController.uploadLanguageImage,
    languageController.resizeLanguageImage,
    languageController.createLanguage
  );

router
  .route("/:id")
  .get(languageController.getLanguage)
  .patch(
    authController.protect,
    authController.restrictTo("admin","user"),
    languageController.uploadLanguageImage,
    languageController.resizeLanguageImage,
    languageController.updateLanguage
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin","user"),
    languageController.deleteLanguage
  );

module.exports = router;
