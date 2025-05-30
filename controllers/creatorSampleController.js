const multer = require("multer");
const sharp = require("sharp");
const CreatorSample = require("./../models/creatorSampleModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");


const multerStorage = multer.memoryStorage();

//create a multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("this file is not an image, Please upload only images", 404),
      false
    );
  }
};

//const upload = multer({ dest: "public/images/users" });

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//when uploading a single file
//exports.uploadEventThumbnailImage = upload.single("thumbnail");

//for multiple images in a field that is an array, use the following
//exports.uploadImages = upload.array('images',3)

//for more than one file(multiple files)
exports.uploadVehicleImages = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 20 },
]);

exports.resizeVehicleImages = catchAsync(async (req, res, next) => {
 
  if (req.files.image) {
    req.body.image = `vehicle-${
      req.body.createdBy
    }-${Date.now()}-vehicle.jpeg`;

    await sharp(req.files.image[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/images/vehicles/${req.body.image}`);
  }

  if (req.files.images) {
    //processing other images
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (file, index) => {
        const filename = `vehicle-${req.body.createdBy}-${Date.now()}-${
          index + 1
        }.jpeg`;

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/vehicles/${filename}`);
        req.body.images.push(filename);
      })
    );
  }

  next();
});

// const multerStorage = multer.memoryStorage();

// //create a multer filter
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(
//       new AppError("this file is not an image, Please upload only images", 404),
//       false
//     );
//   }
// };

// //const upload = multer({ dest: "public/images/users" });

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// //when uploading a single file
// exports.uploadCreatorSampleImage = upload.single("image");

// exports.resizeCreatorSampleImage = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();

//   //1. start by processing the cover image
//   req.body.image = `${req.body.name.split(" ")[0]}-${
//     req.body.createdBy
//   }-${Date.now()}-cover.jpeg`;

//   await sharp(req.file.buffer)
//     .resize(2000, 1333)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/images/creatorsamples/${req.body.image}`);

//   next();
// });

//get all CreatorSample
exports.getAllCreatorSamples = factory.getAll(CreatorSample);
//create a CreatorSamples
exports.createCreatorSample = factory.createOne(CreatorSample);

//get a CreatorSample
exports.getCreatorSample = factory.getOne(CreatorSample);

//deleting a CreatorSample
exports.deleteCreatorSample = factory.deleteOne(CreatorSample);

//updating a CreatorSample
exports.updateCreatorSample = factory.updateOne(CreatorSample);
