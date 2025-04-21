const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const creatorController = require("./../controllers/creatorController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/images/creators" });

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(creatorController.getAllCreators)
  .post(
    authController.protect,
    authController.restrictTo("creator","admin"),
    creatorController.uploadCreatorImage,
    creatorController.resizeCreatorImage,
    creatorController.createCreator
  );

router
  .route("/:id")
  .get(creatorController.getCreator)
  .patch(
   authController.protect,
    authController.restrictTo("creator","brand","admin"),
    creatorController.uploadCreatorImage,
    creatorController.resizeCreatorImage,
    creatorController.updateCreator
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin","creator"),
    creatorController.deleteCreator
  );

module.exports = router;
