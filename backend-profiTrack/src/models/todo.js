const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type:String,
      default:""
    },
    dueDate: {
      type:Date,
    },
    description:{
      // Editor, EditorState 
      type:String,
      default:""
    },
    assignee: {
      // ask to @SyedAbbas
      // who is assignee,
      // whether admin user or seprate users? 
      // type:mongoose.Types.ObjectId,
      // update ref accordingly
      // ref:""

      
      // fullName: 'Jacob Ramirez',
      // avatar: require('@src/assets/images/avatars/12.png').default
    },
    project:{
      // type:mongoose.Types.ObjectId,
      // make sure collection name is same in project schema
      // ref:"projects"
      type:String
    },
    tags: [{
      // whether tags are predefined (mongoose model) 
      // or just string
      type:String
    }],

    isCompleted: {
      type:Boolean,
      default:false,
    },
    completedAt:{
      type:Date
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
    completedBy:{
      type:mongoose.Types.ObjectId,
      // may be admin or user Discuss with @SyedAbass
      // ref:"admins"
    },
    createdBy:{
      type:mongoose.Types.ObjectId,
      ref:"admins"
    },
    deletedBy:{
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
//   title: 'Entire change break our wife wide it daughter mention member.',
//   dueDate: '2020-11-25',
//   description:
//     'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
//   assignee: {
//     fullName: 'Jacob Ramirez',
//     avatar: require('@src/assets/images/avatars/12.png').default
//   },
//   project:"p1",
//   tags: ['update'],
//   isCompleted: false,
//   isDeleted: false,
//   isImportant: false
// }

const model = mongoose.model("todos", todoSchema);
module.exports = model;
