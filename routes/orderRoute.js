const express = require("express");

const orderController = require("./../controllers/orderController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "vehicleOwner","customer","staff","protocolOfficer"),
    orderController.getAllOrders
  )
  .post(
    authController.protect,
    authController.restrictTo("admin", "vehicleOwner","customer","staff","protocolOfficer"),
    orderController.createOrder,
    orderController.uploadOrderImage,
    orderController.resizeOrderImage
  );

//protect order routes
router.use(authController.protect);

router
  .route("/:id")
  .get(authController.restrictTo("admin", "vehicleOwner","customer","staff","protocolOfficer"), orderController.getOrder)
  .patch(
    authController.restrictTo("admin", "vehicleOwner","customer","staff","protocolOfficer"),
    orderController.updateOrder,
    orderController.uploadOrderImage,
    orderController.resizeOrderImage
  )
  .delete(authController.restrictTo("admin"), orderController.deleteOrder);

module.exports = router;
