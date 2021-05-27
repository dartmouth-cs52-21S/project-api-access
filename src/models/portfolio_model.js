import mongoose, { Schema } from 'mongoose';
// header : { e.g.
//     display: true,
//     color: white,
//     background-color: black,
//     font: lala,
//     font-size: ,
//     padding: ,
//     // role: but taken from resume,
//     flex-direction: column,
//     justify-content: center,
// }

// aboutMe : { e.g.
//     display: true,
//     color: white,
//     background-color: black,
//     font: lala,
//     font-size: ,
//     padding: ,
//     userImage: taken from resume json
//     // content: taken from resume json in user
//     flex-direction: column,
//     justify-content: center,
// }

// projects : { e.g.
//     display: true,
//     color: white,
//     background-color: black,
//     font: lala,
//     font-size: ,
//     padding: ,
//     // projects: [<project1 content>, <project2 content>, ...] // taken from resume
//     flex-direction: column,
//     justify-content: center,
// }

// contactMe : { e.g.
//     display: true,
//     color: white,
//     background-color: black,
//     font: lala,
//     font-size: ,
//     padding: ,
//     content: (taken from user DB)
//     flex-direction: row,
//     flex-wrap: wrap,
//     justify-content: center,
// }

// create a PostSchema with a title field
const PortfolioSchema = new Schema({
  name: { type: String },
  header: { JSON },
  aboutMe: { JSON },
  projects: { JSON },
  contactMe: { JSON },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create PostModel class from schema
const PortfolioModel = mongoose.model('Portfolio', PortfolioSchema);

export default PortfolioModel;
