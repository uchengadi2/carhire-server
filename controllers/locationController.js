const Location = require("./../models/locationModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all location
exports.getAllLocations = factory.getAll(Location);

//the handler to create a location
exports.createLocation = factory.createOne(Location);

//the handler to get one location
exports.getLocation = factory.getOne(Location);

//the handler to update a location
exports.updateLocation = factory.updateOne(Location);

//the handler to delete a location
exports.deleteLocation = factory.deleteOne(Location);
