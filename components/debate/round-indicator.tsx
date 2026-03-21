"use client";

interface RoundIndicatorProps {
  current: number;
  max: number;
}

export function RoundIndicator({ current, max }: RoundIndicatorProps) {
  return (
    <div className="text-sm font-medium text-muted-foreground">
      Runde {current} / {max}
    </div>
  );
}
