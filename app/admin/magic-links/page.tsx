"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Link, ArrowLeft } from "lucide-react";
import NextLink from "next/link";

export default function MagicLinksPage() {
  const { data: session } = useSession();
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = (session as any)?.authType === "google";

  const handleGenerate = async () => {
    setError(null);
    setGeneratedLink(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to generate link");
        return;
      }

      const data = await res.json();
      setGeneratedLink(data.magicLink);
    } catch {
      setError("Failed to generate link");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Unauthorized</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <NextLink href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </NextLink>
        <div>
          <h1 className="text-2xl font-bold">{t("magicLinkTitle")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("magicLinkSubtitle")}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            {t("magicLinkGenerate")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="guest-name">{t("magicLinkName")}</Label>
            <Input
              id="guest-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Max Mustermann"
            />
          </div>
          {error && (
            <div className="bg-red-50 text-red-700 text-sm rounded-md p-3">
              {error}
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!name.trim() || loading}
            className="w-full"
          >
            {loading ? "..." : t("magicLinkGenerate")}
          </Button>

          {generatedLink && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input value={generatedLink} readOnly className="text-xs" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("magicLinkExpiry")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
