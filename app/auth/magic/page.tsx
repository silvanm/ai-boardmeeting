"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useLocale } from "@/lib/i18n";

function MagicLinkHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLocale();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("invalid");
      return;
    }

    signIn("magic-link", {
      token,
      callbackUrl: "/",
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        setError("expired");
      } else if (result?.ok) {
        router.push("/");
      }
    });
  }, [searchParams, router]);

  if (error === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-sm w-full space-y-4 text-center">
          <h1 className="text-2xl font-bold">{t("magicLinkExpired")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("magicLinkExpiredMessage")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-sm w-full space-y-4 text-center">
          <h1 className="text-2xl font-bold">{t("magicLinkInvalid")}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground">{t("magicLinkSigningIn")}</p>
    </div>
  );
}

export default function MagicLinkPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <MagicLinkHandler />
    </Suspense>
  );
}
