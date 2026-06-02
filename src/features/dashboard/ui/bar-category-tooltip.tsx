import type { ReactNode } from "react";

type BarCategoryTooltipProps<T extends { name: string }> = {
  active?: boolean;
  payload?: Array<{ payload?: T }>;
  renderDetails: (row: T) => ReactNode;
};

export const BarCategoryTooltip = <T extends { name: string }>({
  active,
  payload,
  renderDetails,
}: BarCategoryTooltipProps<T>) => {
  if (!(active && payload?.[0]?.payload)) {
    return null;
  }

  const row = payload[0].payload as T;

  return (
    <div className="grid min-w-36 gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <p className="font-medium leading-none">{row.name}</p>
      <div className="text-muted-foreground leading-snug">
        {renderDetails(row)}
      </div>
    </div>
  );
};
