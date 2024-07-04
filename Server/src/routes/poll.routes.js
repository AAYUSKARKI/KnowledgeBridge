import { Router } from "express";
import {
    createPoll,
    getPollsBySemester,
    getAllPolls,
    votePoll,
    deletePoll
} from "../controllers/poll.controllers.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/")
    .post(verifyJWT, createPoll)
    .get(verifyJWT, getAllPolls);

router.route("/:id")
    .delete(verifyJWT, deletePoll);

router.route("/vote")
    .post(verifyJWT, votePoll);

router.route("/semester/:semesterId")
    .get(verifyJWT, getPollsBySemester);

export default router;
