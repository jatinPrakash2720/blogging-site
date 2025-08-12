import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { ApiError } from "../utils/ApiError.util.js";
import { Blog } from "../models/blog.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/Cloudinary.util.js";
import { IMAGE_FOLDERS } from "../constants.js";
import { Category } from "../models/category.model.js";

const getBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const sortBy = req.query.sortBy || "createdAt";
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
  const searchQuery = req.query.q;
  const pipeline = [];

  pipeline.push({
    $match: {
      isPublished: true,
      // NEW: Ensure only non-deleted blogs are fetched for the public list
      isDeleted: false,
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
      // Optional: Truncate content for list view
      content: { $substrCP: ["$content", 0, 200] },
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
      docs: "blogs", // Corrected: 'blogs' must be a string literal
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

    const isOwner =
      req.user && blog.owner.toString() === req.user._id.toString();

    if (!isOwner && (!blog.isPublished || blog.isDeleted)) {
      throw new ApiError(404, "Blog not found or not accessible.");
    }

    if (!isOwner) {
      blog.views = (blog.views || 0) + 1;
      await blog.save({ validateBeforeSave: false });
    }
    return res
      .status(200)
      .json(new ApiResponse(200, blog, "Blog fetched Successfully"));
  } catch (error) {
    // Ensure ApiError instances are re-thrown, others wrapped
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, error.message || "Internal Server error");
  }
});

const getBlogsByUserId = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 1;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(400, "Invalid user ID format.");
    }

    const pipeline = [];

    pipeline.push({
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
        isDeleted: false,
        isPublished: true,
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
        content: { $substrCP: ["$content", 0, 200] },
      },
    });
    const sortStage = {};
    sortStage[sortBy] = sortOrder;
    pipeline.push({
      $sort: sortStage,
    });

    const userBlogs = await Blog.aggregatePaginate(Blog.aggregate(pipeline), {
      page: page,
      limit: limit,
      customLabels: {
        docs: "blogs",
      },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, userBlogs, "User blogs fetched successfully.")
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Internal Server error while fetching blogs by userid."
    );
  }
});

const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, slug, content, status } = req.body;
    const thumbnailLocalPath = req.file?.path;

    if ([title, slug, content, status].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All Fields are required"); // Corrected typo
    }
    if (!thumbnailLocalPath) {
      throw new ApiError(400, "Thumbnail is required");
    }

    const existingBlog = await Blog.findOne({
      owner: req.user._id,
      slug: slug.toLowerCase(),
    });

    // CORRECTED LOGIC: If a blog with the same slug by the same owner EXISTS, throw an error.
    if (existingBlog) {
      throw new ApiError(
        409,
        "You already have a blog with this slug. Please choose a different one."
      );
    }

    const thumbnail = await uploadOnCloudinary(
      thumbnailLocalPath,
      IMAGE_FOLDERS.THUMBNAIL
    );

    // CORRECTED: Check for thumbnail.url
    if (!thumbnail || !thumbnail.url) {
      throw new ApiError(500, "Error while uploading thumbnail to Cloudinary");
    }

    const blog = await Blog.create({
      title: title,
      slug: slug.toLowerCase(),
      content: content, // Ensure content is passed
      thumbnail: thumbnail.url,
      owner: req.user._id,
      status: status,
      isPublished: status === "published",
      // isDeleted and deletedAt will default to false/null as per schema
    });

    const createdBlog = await Blog.findById(blog._id).select("-__v");

    if (!createdBlog) {
      throw new ApiError(500, "Something went wrong while creating the blog");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdBlog, "Blog created Successfully")); // CORRECTED: Return createdBlog
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Handle Mongoose duplicate key error specifically if it occurs due to the index
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      throw new ApiError(
        409,
        "A blog with this slug already exists for your account."
      );
    }
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

    // CORRECTED TYPO: "authorizated" -> "authorized"
    if (blog.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to update this blog");
    }
    blog.title = newTitle.trim();
    await blog.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Blog title updated Successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
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

    // CORRECTED TYPO: "authorizated" -> "authorized"
    if (blog.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to update this blog");
    }

    blog.content = newContent.trim();
    await blog.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Blog Content updated Successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
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
    // CORRECTED TYPO: "authorizated" -> "authorized"
    if (blog.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to update this blog");
    }

    const newThumbnail = await uploadOnCloudinary(
      newThumbnailLocalPath,
      IMAGE_FOLDERS.THUMBNAIL
    );
    // CORRECTED: Check for newThumbnail existence and its URL
    if (!newThumbnail || !newThumbnail.url) {
      throw new ApiError(
        500,
        "Error while uploading new thumbnail to Cloudinary"
      );
    }

    const oldThumbnail = blog.thumbnail; // No need for .toString() here, it's already a string URL

    blog.thumbnail = newThumbnail.url;
    const updatedBlog = await blog.save({ validateBeforeSave: false });

    // Delete old thumbnail from Cloudinary only after new one is successfully saved
    if (oldThumbnail) {
      // Only attempt to delete if an old thumbnail existed
      await deleteFromCloudinary(oldThumbnail);
    }

    // CORRECTED: Response format for ApiResponse
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedBlog, "Blog Thumbnail updated Successfully")
      );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
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
    // CORRECTED TYPO: "authorizated" -> "authorized"
    if (blog.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to update this blog");
    }

    // NEW: Prevent toggling if the blog is soft-deleted
    if (blog.isDeleted) {
      throw new ApiError(400, "Cannot toggle status of a deleted blog.");
    }

    const lastUpdated = new Date(blog.updatedAt);
    const currentTime = new Date();

    const timeDifference = currentTime.getTime() - lastUpdated.getTime();

    const timeLimit = 10 * 60 * 1000; // 10 minutes in milliseconds
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

    // CORRECTED: Response format for ApiResponse
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          blogId: blog._id,
          isPublished: blog.isPublished,
          status: blog.status,
          updatedAt: blog.updatedAt, // Include updated timestamp for frontend reference
        },
        `Blog status toggled to '${blog.status}' successfully.`
      )
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, error.message || "Internal Server Error");
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new ApiError(404, "Blog post not found");
    }

    if (blog.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to delete this blog.");
    }

    blog.isPublished = false;
    blog.status = "archived";

    await blog.save({ validateBeforeSave: false });

    await blog.delete();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Blog soft-deleted successfully."));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Internal Server Error during blog soft-deletion"
    );
  }
});

const restoreBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).withDeleted();

    if (!blog) {
      throw new ApiError(404, "Blog post not found");
    }

    if (!blog.isDeleted) {
      throw new ApiError(
        400,
        "Blog is not currently deleted and cannot be restored."
      );
    }

    if (blog.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to restore this blog");
    }

    await blog.restore();

    blog.isPublished = false;
    blog.status = "draft";

    await blog.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Blog restored successfully."));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Internaal Server Error during blog restoration."
    );
  }
});

const getBlogsByTopLevelCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    if (!mongoose.isValidObjectId(categoryId)) {
      throw new ApiError(400, "INvalid category ID.");
    }

    const subCategories = await Category.find({ parent: categoryId });
    const categoryIds = subCategories.map((sub) => sub._id);
    categoryIds.push(new mongoose.Types.ObjectId(categoryId));

    const pipeline = [
      {
        $match: {
          categories: { $in: categoryIds },
          isPublished: true,
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $project: {
                username: 1,
                fullName: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$owner",
      },
    ];

    const blogs = await Blog.aggregatePaginate(Blog.aggregate(pipeline), {
      page: page,
      limit: limit,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          blogs,
          "Blogs for category abd sub-categories fetched successfully."
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message ||
        "Internal Server Error while fetching blogs from top-level category."
    );
  }
});

const getBlogsBySubCategory = asyncHandler(async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    if (!mongoose.isValidObjectId(subCategoryId)) {
      throw new ApiError(400, "Invalid sub-category ID.");
    }

    const pipeline = [
      {
        $match: {
          categories: { $in: [new mongoose.Types.ObjectId(subCategoryId)] },
          isPublished: true,
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeLine: [
            {
              $project: {
                username: 1,
                fullName: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$owner",
      },
    ];

    const blogs = await Blog.aggregatePaginate(Blog.aggregate(pipeline), {
      page: page,
      limit: limit,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          blogs,
          "Blogs for sub-category fetched successfully."
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message ||
        "Internal Server Error during fetching of blog through sub-category."
    );
  }
});

export {
  getBlogs,
  getBlog,
  getBlogsByUserId,
  createBlog,
  updateBlogTitle,
  updateBlogContent,
  updateBlogThumbnail,
  toggleBlogStatus,
  deleteBlog, // Export the new delete function
  restoreBlog, // Export the new restore function
  getBlogsByTopLevelCategory,
  getBlogsBySubCategory,
};
