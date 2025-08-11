import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getReadHistory,
  getUserPageProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUserAvatar,
  updateUserCoverImage,
  updateUserEmail,
  updateUserFullName,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getBlogsByUserId } from "../controllers/blog.controller.js";
import { authLimiter } from "../middlewares/ratelimiter.middleware.js";
const router = Router();
// console.log("User routes loaded");

router.route("/register").post(authLimiter,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(authLimiter,loginUser);
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-fullname").patch(verifyJWT, updateUserFullName);
router.route("/update-email").patch(verifyJWT, updateUserEmail);
router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/update-cover")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("/c/:username").get(verifyJWT, getUserPageProfile);
router.route("/history").get(verifyJWT, getReadHistory);
router.route("/:userId/blogs").get(verifyJWT, getBlogsByUserId);
// router.route("/login").post(registerUser);
export default router;
