const multer = require("multer");
const sharp = require("sharp");
const Policy = require("./../models/policyModel");
const factory = require("./handlerFactory");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");



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
// exports.uploadPolicyImage = upload.single("image");

// exports.resizePolicyImage = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();

//   //1. start by processing the cover image
//   req.body.image = `${req.body.name.split(" ")[0]}-${
//     req.body.createdBy
//   }-${Date.now()}-cover.jpeg`;

//   await sharp(req.file.buffer)
//     .resize(2000, 1333)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/images/policies/${req.body.image}`);

//   next();
// });

//get the handler to get all policies
exports.getAllPolicy = factory.getAll(Policy);

//the handler to create policy
exports.createPolicy = factory.createOne(Policy);

//the handler to get one policy
exports.getPolicy = factory.getOne(Policy);

//the handler to update a Policy
exports.updatePolicy = factory.updateOne(Policy);

//the handler to delete one Policy
exports.deletePolicy = factory.deleteOne(Policy);
