// authRoutes.js
import express from "express";
import {
  testController,
  registerController,
  loginController,
} from "../controller/authController.js";
import { exampleMiddleware } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/test", exampleMiddleware, testController);
router.post("/check", exampleMiddleware, loginController);

router.post("/register", exampleMiddleware, registerController);
router.post("/login", loginController);

export default router;
