import { Router } from "express";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";

const sessionsRouter = Router();
const authenticateUserController = new AuthenticateUserController();

sessionsRouter.post("/", authenticateUserController.create);

export { sessionsRouter };
