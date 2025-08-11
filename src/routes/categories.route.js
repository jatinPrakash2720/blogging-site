import { Router } from "express";
import { createSubCategory, getFilerableSubCategories, getSubCategories, getTopLevelCategories } from "../controllers/category.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();
router.use(verifyJWT)

router.route("/top-level").get(getTopLevelCategories)
router.route("/:parentId/sub-categories").get(getSubCategories);
router.route("/:parentId/filterable-subcategories").get(getFilerableSubCategories);
router.route("/:parentId/sub-categories").post(createSubCategory)

export default router;
