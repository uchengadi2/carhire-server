const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const creatorSampleController = require("./../controllers/creatorSampleController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/images/categories" });

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(creatorSampleController.getAllCreatorSamples)
  .post(
    authController.protect,
    authController.restrictTo("admin","vehicleOwner"),
    creatorSampleController.uploadVehicleImages,
    creatorSampleController.resizeVehicleImages,
    creatorSampleController.createCreatorSample
  );

router
  .route("/:id")
  .get(creatorSampleController.getCreatorSample)
  .patch(
    authController.protect,
    authController.restrictTo("admin","vehicleOwner"),
    creatorSampleController.uploadVehicleImages,
    creatorSampleController.resizeVehicleImages,
    creatorSampleController.updateCreatorSample
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin","vehicleOwner"),
    creatorSampleController.deleteCreatorSample
  );

module.exports = router;
