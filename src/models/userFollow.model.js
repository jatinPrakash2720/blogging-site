import mongoose, { Schema } from "mongoose";

const userFollowSchema = new Schema(
  {
    followerid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    followingid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const UserFollow = mongoose.model("UserFollow", userFollowSchema);
