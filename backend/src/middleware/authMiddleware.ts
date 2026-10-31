import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, JwtPayload } from "../utils/jwt";
import { AppError } from "./errorMiddleware";
import { User } from "../models/User";

// Extend Express Request to carry authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { name: string };
    }
  }
}

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError("No token provided", 401, "UNAUTHORIZED");
    }

    const token   = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);

    // Ensure user still exists and is active
    const user = await User.findById(payload.userId).select("name isActive role").lean();
    if (!user || !user.isActive) {
      throw new AppError("User not found or deactivated", 401, "UNAUTHORIZED");
    }

    req.user = { ...payload, name: user.name };
    next();
  } catch (err) {
    next(err);
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError("Not authenticated", 401, "UNAUTHORIZED"));
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Access denied — insufficient role", 403, "FORBIDDEN"));
    }
    next();
  };
}

export const requireStudent = authorize("student");
export const requireCompany = authorize("company");
export const requireAdmin   = authorize("admin");
export const requireStudentOrAdmin = authorize("student", "admin");
export const requireCompanyOrAdmin = authorize("company", "admin");
