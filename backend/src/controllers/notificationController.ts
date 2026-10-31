import { Request, Response } from "express";
import { asyncHandler } from "../middleware/errorMiddleware";
import * as notifService from "../services/notificationService";
import { sendSuccess, sendList } from "../utils/apiResponse";
import { getPagination, buildPaginationMeta } from "../utils/pagination";

export const getNotifications = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const { data, total } = await notifService.getNotifications(req.user!.userId, page, limit);
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

export const getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
  const count = await notifService.getUnreadCount(req.user!.userId);
  sendSuccess(res, { count });
});

export const markRead = asyncHandler(async (req: Request, res: Response) => {
  await notifService.markRead(req.params.id, req.user!.userId);
  sendSuccess(res, null, "Marked as read");
});

export const markAllRead = asyncHandler(async (req: Request, res: Response) => {
  await notifService.markAllRead(req.user!.userId);
  sendSuccess(res, null, "All notifications marked as read");
});

export const deleteNotification = asyncHandler(async (req: Request, res: Response) => {
  await notifService.deleteNotification(req.params.id, req.user!.userId);
  sendSuccess(res, null, "Notification deleted");
});
