import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  getBlogsBySubCategory,
  getBlogsByTopLevelCategory,
  restoreBlog,
  toggleBlogStatus,
  updateBlogContent,
  updateBlogThumbnail,
  updateBlogTitle,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
router.use(verifyJWT);

router.route("/").get(getBlogs);
router.route("/").post(upload.single("thumbnail"), createBlog);
router.route("/:blogId").get(getBlog);
router.route("/:blogId/title").patch(updateBlogTitle);
router.route("/:blogId/content").patch(updateBlogContent);
router
  .route("/:blogId/thumbnail")
  .patch(upload.single("thumbnail"), updateBlogThumbnail);
router.route("/:blogId/toggle-status").patch(toggleBlogStatus);
router.route("/:blogId").delete(deleteBlog);
router.route("/:blogId/restore").patch(restoreBlog);
router.route("/by-category/:categoryId").get(getBlogsByTopLevelCategory);
router.route("/by-sub-category/:subCategoryId").get(getBlogsBySubCategory);

export default router;
