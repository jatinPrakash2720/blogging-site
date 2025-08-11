import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  getUserFollowers,
  getUserFollowing,
  toggleFollow,
} from "../controllers/userfollow.controller";

const router = Router();
router.use(verifyJWT);

router.route("/toggle/:userIdToFollow").post(toggleFollow);
router.route("/followers/:userId").get(getUserFollowers);
router.route("/following/:userId").get(getUserFollowing);

export default router;
