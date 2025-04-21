const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const nicheController = require("./../controllers/nicheController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/images/niches" });

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(nicheController.getAllNiches)
  .post(
    authController.protect,
    authController.restrictTo("admin","user"),
    nicheController.uploadNicheImage,
    nicheController.resizeNicheImage,
    nicheController.createNiche
  );

router
  .route("/:id")
  .get(nicheController.getNiche)
  .patch(
    authController.protect,
    authController.restrictTo("admin","user"),
    nicheController.uploadNicheImage,
    nicheController.resizeNicheImage,
    nicheController.updateNiche
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin","user'"),
    nicheController.deleteNiche
  );

module.exports = router;
