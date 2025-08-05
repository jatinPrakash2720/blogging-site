import { asyncHandler } from "../utils/asyncHandler.util";
import { ApiResponse } from "../utils/ApiResponse.util";
import { ApiError } from "../utils/ApiError.util";
import { Blog } from "../models/blog.model";
import { User } from "../models/user.model";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/Cloudinary.util";
import { IMAGE_FOLDERS } from "../constants";

const getBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const sortBy = req.query.sortBy || "createdAt";
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
  const searchQuery = req.query.q;
  const pipeline = [];

  pipeline.push({
    $match: {
      isPublisged: true,
    },
  });
  if (searchQuery) {
    pipeline.push({
      $match: {
        title: {
          $regex: searchQuery,
          $options: "i",
        },
      },
    });
  }
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "owner",
      foreignField: "_id",
      as: "owner",
    },
  });
  pipeline.push({
    $unwind: {
      path: "$owner",
      preserveNullAndEmptyArrays: true,
    },
  });
  pipeline.push({
    $project: {
      title: 1,
      thumbnail: 1,
      slug: 1,
      views: 1,
      isPublished: 1,
      createdAt: 1,
      updatedAt: 1,
      owner: {
        _id: "$owner._id",
        username: "$owner.username",
        fullName: "$owner.fullName",
        avatar: "$owner.avatar",
      },
    },
  });

  const sortStage = {};
  sortStage[sortBy] = sortOrder;
  pipeline.push({
    $sort: sortStage,
  });

  const blogs = await Blog.aggregatePaginate(Blog.aggregate(pipeline), {
    page: page,
    limit: limit,
    customLabels: {
      docs: "blogs", // Rename 'docs' to 'blogs' in the response
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, blogs, "Published blogs fetched successfully"));
});
const getBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new ApiError(404, "Blog post not found");
    }

    if (!blog.isPublished) {
      throw new ApiError(402, "Blog not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, blog, "Blog fetched Successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Internal Server error");
  }
});
const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, slug, content, status } = req.body;
    const thumbnailLocalPath = req.file?.path;
    if ([title, slug, content, status].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All Fields are requied");
    }
    if (!thumbnailLocalPath) {
      throw new ApiError(400, "Thumbnail is required");
    }
    const exitedBlog = await Blog.findOne({
      owner: req.user._id,
      slug: slug.toLowerCase(),
    });
    if (!exitedBlog) {
      throw new ApiError(409, "Blog with same slug already exists!");
    }

    const thumbnail = await uploadOnCloudinary(
      thumbnailLocalPath,
      IMAGE_FOLDERS.THUMBNAIL
    );

    if (!thumbnail) {
      throw new ApiError(409, "Error while uploading upon cloudinary");
    }
    const blog = await Blog.create({
      title: title,
      slug: slug.toLowerCase(),
      thumbnail: thumbnail.url,
      owner: req.user._id,
      status: status,
      isPublished: status === "published",
    });

    const createdBlog = await Blog.findById(blog._id);

    if (!createdBlog) {
      throw new ApiError(500, "Something went wrong while creating the blog");
    }
    return res
      .status(201)
      .json(new ApiResponse(201, createBlog, "Blog created Successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Internal Error");
  }
});
const updateBlogTitle = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const { newTitle } = req.body;

    if (!newTitle || newTitle.trim() === "") {
      throw new ApiError(400, "New Title is required");
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new ApiError(404, "Blog Post not found");
    }

    if (blog.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorizated to update this blog");
    }
    blog.title = newTitle.trim();
    await blog.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Blog title updated Successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Internal Error");
  }
});
const updateBlogContent = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const { newContent } = req.body;

    if (!newContent || newContent.trim() === "") {
      throw new ApiError(400, "New Content is required");
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new ApiError(404, "Blog Post not found");
    }

    if (blog.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorizated to update this blog");
    }

    blog.content = newContent.trim();
    await blog.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Blog Content updated Successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Internal Error");
  }
});
const updateBlogThumbnail = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const newThumbnailLocalPath = req.file?.path;

    if (!newThumbnailLocalPath || newThumbnailLocalPath.trim() === "") {
      throw new ApiError(400, "New Thumbnail is required");
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new ApiError(404, "Blog Post not found");
    }
    if (blog.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorizated to update this blog");
    }

    const newThumbnail = await uploadOnCloudinary(
      newThumbnailLocalPath,
      IMAGE_FOLDERS.THUMBNAIL
    );
    if (!newThumbnail.url) {
      throw new ApiError(408, "Error while uploading on Cloudinary");
    }

    const oldThumbnail = blog.thumbnail.toString();

    blog.thumbnail = newThumbnail.url;
    await blog.save({ validateBeforeSave: false });

    await deleteFromCloudinary(oldThumbnail);

    return res.status(200, {}, "Blog Thumbnail updated Successfully");
  } catch (error) {
    throw new ApiError(500, error.message || "Internal Error");
  }
});
const toggleBlogStatus = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new ApiError(404, "Blog Post not found");
    }
    if (blog.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorizated to update this blog");
    }

    const lastUpdated = new Date(blog.updatedAt);
    const currentTime = new Date();

    const timeDifference = currentTime.getTime() - lastUpdated.getTime();

    const timeLimit = 10 * 60 * 1000;
    if (timeDifference < timeLimit) {
      const remainingTimeMs = timeLimit - timeDifference;
      const remainingMinutes = Math.ceil(remainingTimeMs / (60 * 1000));

      throw new ApiError(
        429,
        `You can only toggle the blog status once every 10 minutes. Please wait ${remainingMinutes} minute(s).`
      );
    }
    blog.isPublished = !blog.isPublished;
    blog.status = blog.isPublished ? "published" : "draft";

    await blog.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(200, {}, `Blog status toggled to '${blog.status}' successfully.`);
  } catch (error) {
    throw new ApiError(500, error.message || "Internal Server Error");
  }
});
const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  
})

export {
  getBlogs,
  getBlog,
  createBlog,
  updateBlogTitle,
  updateBlogContent,
  updateBlogThumbnail,
  toggleBlogStatus,
};
