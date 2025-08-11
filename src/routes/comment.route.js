import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  addCommentToBlogs,
  deleteComment,
  getBlogComments,
} from "../controllers/comment.controller";

const router = Router();
router.use(verifyJWT);

router.route("/:blogId").get(getBlogComments);
router.route("/:blogId").post(addCommentToBlogs);
router.route("/c/:commentId").delete(deleteComment);

export default router;
