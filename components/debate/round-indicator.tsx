"use client";

import { useLocale } from "@/lib/i18n";

interface RoundIndicatorProps {
  current: number;
  max: number;
}

export function RoundIndicator({ current, max }: RoundIndicatorProps) {
  const { t } = useLocale();
  return (
    <div className="text-sm font-medium text-muted-foreground">
      {t("round")} {current} / {max}
    </div>
  );
}
