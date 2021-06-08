import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PortfolioSchema = new Schema({
  name: String,
  header: Object,
  aboutMe: Object,
  projects: Object,
  contactMe: Object,
  resume: Object,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  minimize: false,
});

const PortfolioModel = mongoose.model('Portfolio', PortfolioSchema);

export default PortfolioModel;
