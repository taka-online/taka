import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Response, NextFunction } from "express";
import { emailRequestOtp } from "@/controllers/auth.controller";
import prisma from "@tests/mocks/database";
import { sendMagicLinkEmail } from "@/utils/email";
import type { RequestWithUser } from "@/types";

vi.mock("@/utils/email", () => ({
  sendMagicLinkEmail: vi.fn(),
}));

type EmailOtpRequestBody = {
  email?: string;
};

describe("auth.controller: emailRequestOtp", () => {
  let req: Partial<RequestWithUser & { body: EmailOtpRequestBody }>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      sendStatus: vi.fn(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  it("should create a verification token and send an email for a valid request", async () => {
    const userEmail = "test@example.com";
    const verificationCode = "test_verification_code";
    (req.body as EmailOtpRequestBody).email = userEmail;

    prisma.verificationToken.create.mockResolvedValue({
      code: verificationCode,
      email: userEmail,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      createdAt: new Date(),
    });

    vi.mocked(sendMagicLinkEmail).mockResolvedValue(undefined);

    await emailRequestOtp(req as RequestWithUser, res as Response, next);

    expect(prisma.verificationToken.create).toHaveBeenCalledWith({
      data: {
        email: userEmail,
        expiresAt: expect.any(Date) as Date,
      },
    });
    expect(sendMagicLinkEmail).toHaveBeenCalledWith(userEmail, verificationCode);
    expect(res.sendStatus).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with a Zod error for an invalid email", async () => {
    (req.body as EmailOtpRequestBody).email = "not-an-email";

    await emailRequestOtp(req as RequestWithUser, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ name: "ZodError" }),
    );
    expect(prisma.verificationToken.create).not.toHaveBeenCalled();
    expect(sendMagicLinkEmail).not.toHaveBeenCalled();
  });

  it("should call next with a Zod error for a missing email", async () => {
    delete (req.body as EmailOtpRequestBody).email;

    await emailRequestOtp(req as RequestWithUser, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ name: "ZodError" }),
    );
  });

  it("should call next with the error if database creation fails", async () => {
    const dbError = new Error("Database connection failed");
    (req.body as EmailOtpRequestBody).email = "test@example.com";
    prisma.verificationToken.create.mockRejectedValue(dbError);

    await emailRequestOtp(req as RequestWithUser, res as Response, next);

    expect(next).toHaveBeenCalledWith(dbError);
    expect(res.sendStatus).not.toHaveBeenCalled();
  });

  it("should call next with the error if email sending fails", async () => {
    const emailError = new Error("SMTP server down");
    (req.body as EmailOtpRequestBody).email = "test@example.com";
    prisma.verificationToken.create.mockResolvedValue({
      code: "test_code",
      email: "test@example.com",
      expiresAt: new Date(),
      createdAt: new Date(),
    });
    vi.mocked(sendMagicLinkEmail).mockRejectedValue(emailError);

    await emailRequestOtp(req as RequestWithUser, res as Response, next);

    expect(next).toHaveBeenCalledWith(emailError);
    expect(res.sendStatus).not.toHaveBeenCalled();
  });
}); 