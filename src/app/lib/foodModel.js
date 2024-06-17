

const mongoose = require('mongoose');

// Define the schema for the restaurant
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
    
  },
  img_path: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  resto_id: mongoose.Schema.Types.ObjectId
});

// Create a model using the schema
export const FoodOwner = mongoose.models.Food ||
  mongoose.model('Food', foodSchema);


