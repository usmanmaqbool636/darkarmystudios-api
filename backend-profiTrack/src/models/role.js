const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Role already exists',
        },
      },
      // alson called privileges
      permissions: {
        type: Array,
        default: [
          {
            read: Boolean,
            default: false
          },
          {
            update: Boolean,
            default: false
          },
          {
            write: Boolean,
            default: false
          },
          {
            delete: Boolean,
            default: false
          },
          {
            deny: Boolean,
            default: false
          },
        ],
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admins",
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const model = mongoose.model("roles", roleSchema);
  module.exports = model;
  