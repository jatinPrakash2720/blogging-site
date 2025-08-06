import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  restoreBlog,
  toggleBlogStatus,
  updateBlogContent,
  updateBlogThumbnail,
  updateBlogTitle,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/").get(verifyJWT, getBlogs);
router.route("/").post(verifyJWT, upload.single("thumbnail"), createBlog);
router.route("/:blogId").get(verifyJWT, getBlog);
router.route("/:blogId/title").patch(verifyJWT, updateBlogTitle);
router.route("/:blogId/content").patch(verifyJWT, updateBlogContent);
router
  .route("/:blogId/thumbnail")
  .patch(verifyJWT, upload.single("thumbnail"), updateBlogThumbnail);
router.route("/:blogId/toggle-status").patch(verifyJWT, toggleBlogStatus);
router.route("/:blogId").delete(verifyJWT, deleteBlog);
router.route("/:blogId/restore").patch(verifyJWT, restoreBlog);

export default router;
