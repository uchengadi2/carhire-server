const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const brandController = require("./../controllers/brandController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/images/brands" });

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(brandController.getAllBrands)
  .post(
    authController.protect,
    authController.restrictTo("brand"),
    brandController.uploadBrandImage,
    brandController.resizeBrandImage,
    brandController.createBrand
  );

router
  .route("/:id")
  .get(brandController.getBrand)
  .patch(
   authController.protect,
    authController.restrictTo("brand"),
    brandController.uploadBrandImage,
    brandController.resizeBrandImage,
    brandController.updateBrand
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin","brand"),
    brandController.deleteBrand
  );

module.exports = router;
