const Order = require("./../models/orderModel");
const multer = require("multer");
const sharp = require("sharp");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

const multerStorage = multer.memoryStorage();

// //create a multer filter
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("video") || file.mimetype.startsWith("audio")) {
//     cb(null, true);
//   } else {
//     cb(
//       new AppError("this file is not a video or an audio, Please upload only the required creative type", 404),
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
// //exports.uploadEventThumbnailImage = upload.single("thumbnail");

// //for multiple images in a field that is an array, use the following
// //exports.uploadImages = upload.array('images',3)

// //for more than one file(multiple files)
// exports.uploadCreativeItems = upload.fields([
//   { name: "creatives", maxCount: 1000 },
//   { name: "hooks", maxCount: 1000 },
// ]);

// exports.resizeCourseImages = catchAsync(async (req, res, next) => {
//   //if (!req.files.thumbnail || !req.files.images) return next();
//   //if (!req.files.thumbnail) return next();

//   //processing the thumbnail

//   if (req.files.imageCover) {
//     req.body.imageCover = `courses-${
//       req.body.createdBy
//     }-${Date.now()}-imageCover.jpeg`;

//     await sharp(req.files.imageCover[0].buffer)
//       .resize(500, 500)
//       .toFormat("jpeg")
//       .jpeg({ quality: 90 })
//       .toFile(`public/images/courses/${req.body.imageCover}`);
//   }

//   if (req.files.images) {
//     //processing other images
//     req.body.images = [];
//     await Promise.all(
//       req.files.images.map(async (file, index) => {
//         const filename = `courses-${req.body.createdBy}-${Date.now()}-${
//           index + 1
//         }.jpeg`;

//         await sharp(file.buffer)
//           // .resize(2000, 1333)
//           .resize(500, 500)
//           .toFormat("jpeg")
//           .jpeg({ quality: 90 })
//           .toFile(`public/images/courses/${filename}`);
//         req.body.images.push(filename);
//       })
//     );
//   }

//   next();
// });

// //when uploading a single file
// exports.uploadCreativeImage = upload.single("creative");

// exports.resizeCreative = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();

//   //1. start by processing the creative item
//   if(req.body.creativeType === 'video'){
//     req.body.creatives = `${req.body.projectName.split(" ")[0]}-${
//         req.body.createdBy
//       }-${Date.now()}-cover.mp4`;
    
//       await sharp(req.file.buffer)
//         .resize(2000, 1333)
//         .toFormat("mp4")
//         .jpeg({ quality: 90 })
//         .toFile(`public/images/creatives/${req.body.creatives}`);
    
//       next();

//   }else{

//   }
  
// });

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
exports.uploadOrderImage = upload.single("image");

exports.resizeOrderImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  console.log('requst is:',req.body)

  //1. start by processing the cover image
  req.body.image = `${req.body.orderNumber.split(" ")[0]}-${
    req.body.createdBy
  }-${Date.now()}-cover.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/orders/${req.body.image}`);

  next();
});






//the handler for getting all Orders
exports.getAllOrders = factory.getAll(Order);

//the handler to create Order
exports.createOrder = factory.createOne(Order);

//the handler to get one Order
exports.getOrder = factory.getOne(Order);

//the handler to update an Order
exports.updateOrder = factory.updateOne(Order);

//the handler to delete an Order
exports.deleteOrder = factory.deleteOne(Order);
