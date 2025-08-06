import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import MongooseDelete from "mongoose-delete";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // isDeleted: {
    //   type: Boolean,
    //   default: false,
    // },
    // deletedAt: {
    //   type: Date,
    //   default: null,
    // },
  },
  { timestamps: true }
);

blogSchema.index({ owner: 1, slug: 1 }, { unique: true });

blogSchema.plugin(mongooseAggregatePaginate);

blogSchema.plugin(MongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

export const Blog = mongoose.model("Blog", blogSchema);
