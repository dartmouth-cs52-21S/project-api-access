import mongoose, { Schema } from 'mongoose';

const ImageSchema = new Schema({
  url: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  minimize: false,
});

// create PostModel class from schema
const ImageModel = mongoose.model('Image', ImageSchema);

export default ImageModel;
