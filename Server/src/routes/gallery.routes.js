import { Router } from "express";
import {
    uploadImage,
    getAllGalleryItems,
    deleteGalleryItem
} from "../controllers/gallery.controllers.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/")
    .post(verifyJWT, uploadImage)
    .get(verifyJWT, getAllGalleryItems);

router.route("/:id")
    .delete(verifyJWT, deleteGalleryItem);

export default router;
