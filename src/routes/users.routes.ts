import { Router } from "express";
import { UserController } from "../controllers/user.controllers";

const router = Router();

const userController = new UserController();

router.post("/signup", userController.signUp);

router.get("/users", userController.getAll);

router.get("/users/:accountId", userController.getByAccountId);

export { router };
