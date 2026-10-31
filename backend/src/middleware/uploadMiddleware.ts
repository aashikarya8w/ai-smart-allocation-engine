import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { env } from "../config/env";

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const resumeStorage = multer.diskStorage({
  destination(_req, _file, cb) {
    const dir = path.join(env.upload.dir, "resumes");
    ensureDir(dir);
    cb(null, dir);
  },
  filename(_req, file, cb) {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

function pdfFilter(_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed"));
}

export const uploadResume = multer({
  storage:  resumeStorage,
  fileFilter: pdfFilter,
  limits: { fileSize: env.upload.maxFileSize },
}).single("resume");
