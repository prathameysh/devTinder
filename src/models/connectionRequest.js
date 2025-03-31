const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"], // Fixed "accepted" typo
        message: `{VALUE} is not a valid status`,
      },
    },
  },
  { timestamps: true }
);

// Prevent duplicate requests from the same user to another
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

// Prevent users from sending requests to themselves
connectionRequestSchema.pre("save", function (next) {
  if (this.fromUserId.equals(this.toUserId)) {
    return next(new Error("Cannot send a connection request to yourself!"));
  }
  next();
});

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;
