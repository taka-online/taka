import type { Express, Request, Response } from "express";
import {
  emailRequestOtp,
  emailVerifyOtp,
  logout,
  refreshToken,
} from "./controllers/auth.controller";
// import requireUser from "./middleware/requireUser";

const routes = (app: Express) => {
  app.get("/", (_req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // Auth routes
  app.post("/auth/email/request_otp", emailRequestOtp);
  app.post("/auth/email/verify_otp", emailVerifyOtp);
  app.get("/auth/logout", logout);
  app.post("/auth/refresh_token", refreshToken);

  app.get("/*splat", (_req: Request, res: Response) => {
    res.status(404).send();
  });
};

export default routes;
