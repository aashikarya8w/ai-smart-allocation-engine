"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2Icon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { verifyEmailService } from "@/services/authService";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    verifyEmailService("mock-token")
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardContent className="p-10 text-center">
          {status === "loading" && (
            <>
              <Loader2Icon className="mx-auto mb-4 size-10 animate-spin text-primary" />
              <h2 className="text-base font-semibold text-foreground">Verifying your email…</h2>
              <p className="mt-2 text-sm text-muted-foreground">Please wait a moment.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircleIcon className="size-7 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-base font-semibold text-foreground">Email verified!</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your email has been verified successfully.
              </p>
              <div className="mt-6">
                <Link href="/login" className="text-sm text-primary hover:underline">
                  Sign in to your account →
                </Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/10">
                <XCircleIcon className="size-7 text-destructive" />
              </div>
              <h2 className="text-base font-semibold text-foreground">Verification failed</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The link is invalid or has expired. Please request a new one.
              </p>
              <div className="mt-6">
                <Link href="/login" className="text-sm text-primary hover:underline">
                  Back to Sign in
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
