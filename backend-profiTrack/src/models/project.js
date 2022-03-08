const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type:String,
      default:""
    },
    description:{
      type:String,
      default:""
    },
    // list of assignees
    // Change the name if required from assignees to members
    assignees: [
      // ref to user model who is assignee 
      // discuss with @syedAbass
    ],
    tags: [String],
    isCompleted: {
      type:Boolean,
      default:false
    },
    isDeleted: {
      type:Boolean,
      default:false,
    },
    deletedAt:{
      type:Date
    },
    isImportant: {
      type:Boolean,
      default:false
    },
    // totalTask came from todos model using aggregation
    // totalTask:10,

    // completedTask came from todos model using aggregation
    // completedTask:5,
    visibility:{
      type:String,
      enum:["public","private","multiple teams"],
      // TODO set default visibilty according to frontend
      // default:"public"
    },
    createdBy:{
      type:mongoose.Types.ObjectId,
      ref:"admins"
    }
  },
  {
    timestamps: true,
  }
);
// TODO Example
// {
//   id: nanoid(),
//   title: 'Fix Responsiveness for new structure 💻',
//   dueDate: '2020-11-18',
//   createdAt: '2020-11-18',
//   description:
//     'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
//   assignee: [],
//   tags: ['low'],
//   isCompleted: false,
//   isDeleted: false,
//   isImportant: true,
//   totalTask:10,
//   completedTask:5,
//   visibility:"public"
// }

const model = mongoose.model("project", projectSchema);
module.exports = model;
