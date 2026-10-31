import { Response } from "express";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function sendSuccess(
  res: Response,
  data: unknown = null,
  message = "Success",
  statusCode = 200
): Response {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendList(
  res: Response,
  data: unknown[],
  pagination: PaginationMeta,
  message = "Success"
): Response {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  });
}

export function sendCreated(res: Response, data: unknown, message = "Created successfully"): Response {
  return sendSuccess(res, data, message, 201);
}

export function sendError(
  res: Response,
  message = "Something went wrong",
  statusCode = 500,
  errors?: unknown[]
): Response {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
  });
}

export function sendNotFound(res: Response, message = "Not found"): Response {
  return sendError(res, message, 404);
}

export function sendUnauthorized(res: Response, message = "Unauthorized"): Response {
  return sendError(res, message, 401);
}

export function sendForbidden(res: Response, message = "Forbidden"): Response {
  return sendError(res, message, 403);
}

export function sendBadRequest(res: Response, message = "Bad request", errors?: unknown[]): Response {
  return sendError(res, message, 400, errors);
}
