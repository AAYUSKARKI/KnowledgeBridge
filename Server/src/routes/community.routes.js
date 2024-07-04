import { Router } from "express";
import {
    createCommunity,
    getAllCommunities,
    getCommunityById,
    deleteCommunity
} from "../controllers/community.controllers.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/")
    .post(verifyJWT,upload.single('avatar'),createCommunity)
    .get(verifyJWT, getAllCommunities);

router.route("/:communityId")
    .get(verifyJWT, getCommunityById)
    .delete(verifyJWT, deleteCommunity);

export default router;
