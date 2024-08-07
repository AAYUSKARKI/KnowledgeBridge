import { Router } from "express";
import {
    createPoll,
    getPollsBySemester,
    getAllPolls,
    votePoll,
    getPollbyid,
    deletePoll,
    totalPolls
} from "../controllers/poll.controllers.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/")
    .post(verifyJWT, createPoll)
    .get(verifyJWT, getAllPolls);

router.route("/:id")
    .delete(verifyJWT, deletePoll);

router.route("/:id")
    .get(verifyJWT, getPollbyid);

router.route("/vote")
    .post(verifyJWT, votePoll);

router.route("/semester/:semesterId")
    .get(verifyJWT, getPollsBySemester);

router.route("/totalpolls")
    .get(verifyJWT, totalPolls);

export default router;
