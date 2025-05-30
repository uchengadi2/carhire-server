const express = require("express");

const locationController = require("./../controllers/locationController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

// router.use(authController.protect);

// router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(locationController.getAllLocations)
  .post(locationController.createLocation);

router
  .route("/:id")
  .get(locationController.getLocation)
  .patch(locationController.updateLocation)
  .delete(locationController.deleteLocation);

module.exports = router;
