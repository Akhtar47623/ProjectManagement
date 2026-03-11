import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.controller.js";
import { verifyEmail } from "../controllers/auth.controllers.js";
const router = Router();

router.route("/").get(healthCheck);
router.route("/verify-email/:verificationToken").get(verifyEmail);
export default router;
