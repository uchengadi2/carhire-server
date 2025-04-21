const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const projectController = require("./../controllers/projectController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/images/projects" });

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(projectController.getAllProjects)
  .post(
    authController.protect,
    authController.restrictTo("admin","brand"),
    projectController.uploadProjectImage,
    projectController.resizeProjectImage,
    projectController.createProject
  );

router
  .route("/:id")
  .get(projectController.getProject)
  .patch(
    authController.protect,
    authController.restrictTo("admin","brand"),
    projectController.uploadProjectImage,
    projectController.resizeProjectImage,
    projectController.updateProject
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin","brand"),
    projectController.deleteProject
  );

module.exports = router;
