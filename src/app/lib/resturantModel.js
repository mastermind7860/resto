

const mongoose = require('mongoose');

// Define the schema for the restaurant
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
});

// Create a model using the schema
export const RestaurantOwner = mongoose.models.Restaurant ||
  mongoose.model('Restaurant', restaurantSchema);

// export const RestaurantOwner = mongoose.models.Restaurant ||
//   mongoose.model('Resturant', restaurantSchema);


