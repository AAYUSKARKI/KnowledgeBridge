import { Router } from "express";
import {
    createEvent,
    getAllEvents,
    getEventById,
    deleteEvent
} from "../controllers/event.controllers.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/")
    .post(verifyJWT, createEvent)
    .get(verifyJWT, getAllEvents);

router.route("/:id")
    .get(verifyJWT, getEventById)
    .delete(verifyJWT, deleteEvent);

export default router;
