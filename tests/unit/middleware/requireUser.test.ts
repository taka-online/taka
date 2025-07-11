import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Response, NextFunction } from "express";
import requireUser from "@/middleware/requireUser";
import { verifyToken } from "@/utils/tokens";
import type { RequestWithUser } from "@/types";

vi.mock("@/utils/tokens", () => ({
  verifyToken: vi.fn(),
}));

describe("requireUser middleware", () => {
  let req: Partial<RequestWithUser>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      sendStatus: vi.fn(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  it("should call next() and attach user if token is valid", async () => {
    const userPayload = { userId: "test-user-id", iat: 123, exp: 456 };
    req.headers = { authorization: "Bearer valid.token.here" };
    vi.mocked(verifyToken).mockReturnValue(userPayload);

    await requireUser(req as RequestWithUser, res as Response, next);

    expect(verifyToken).toHaveBeenCalledWith("valid.token.here");
    expect(req.user).toEqual(userPayload);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.sendStatus).not.toHaveBeenCalled();
  });

  it("should return 401 if authorization header is missing", async () => {
    await requireUser(req as RequestWithUser, res as Response, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
    expect(verifyToken).not.toHaveBeenCalled();
  });

  it("should return 401 if authorization header does not start with 'Bearer '", async () => {
    req.headers = { authorization: "Invalid valid.token.here" };

    await requireUser(req as RequestWithUser, res as Response, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is missing from header", async () => {
    req.headers = { authorization: "Bearer " };

    await requireUser(req as RequestWithUser, res as Response, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 403 if token is invalid", async () => {
    req.headers = { authorization: "Bearer invalid.token.here" };
    vi.mocked(verifyToken).mockReturnValue(null);

    await requireUser(req as RequestWithUser, res as Response, next);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
}); 