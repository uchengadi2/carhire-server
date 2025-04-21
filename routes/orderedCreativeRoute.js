const express = require("express");

const orderedCreativeController = require("./../controllers/orderedCreativesController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "brand","creator"),
    orderedCreativeController.getAllOrderedCreatives
  )
  .post(
    authController.protect,
    authController.restrictTo("admin", "brand","creator"),
    orderedCreativeController.createOrderedCreative
  );

//protect order routes
router.use(authController.protect);

router
  .route("/:id")
  .get(authController.restrictTo("admin", "brand","creator"), orderedCreativeController.getOrderedCreative)
  .patch(
    authController.restrictTo("admin", "brand","creator"),
    orderedCreativeController.updateOrderedCreative
  )
  .delete(authController.restrictTo("admin"), orderedCreativeController.deleteOrderedCreative);

module.exports = router;
