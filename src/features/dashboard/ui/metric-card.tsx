import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type MetricCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  snapshotCaption?: string;
};

export const MetricCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  snapshotCaption,
}: MetricCardProps) => {
  const hasFooter = Boolean(snapshotCaption ?? trend);

  return (
    <Card className="flex h-full flex-col gap-2 p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
        <CardTitle className="font-medium text-sm">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        <div>
          <div className="font-bold text-2xl tabular-nums">{value}</div>
          {description ? (
            <p className="mt-1 text-muted-foreground text-xs">{description}</p>
          ) : null}
        </div>

        {hasFooter ? (
          <div className="mt-auto space-y-0.5 pt-2">
            {snapshotCaption ? (
              <p className="text-muted-foreground text-xs">{snapshotCaption}</p>
            ) : null}
            {trend ? (
              <p
                className={
                  trend.isPositive
                    ? "text-green-500 text-xs"
                    : "text-red-500 text-xs"
                }
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% от
                прошлого периода
              </p>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
