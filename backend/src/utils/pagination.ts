import { Request } from "express";
import type { PaginationMeta } from "./apiResponse";

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export function getPagination(req: Request): PaginationOptions {
  const page  = Math.max(1, parseInt(String(req.query.page  ?? "1"),  10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit ?? "10"), 10) || 10));
  const skip  = (page - 1) * limit;
  return { page, limit, skip };
}

export function buildPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
