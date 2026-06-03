import type { LucideIcon } from "lucide-react";

import {
  DashboardCardHeader,
  dashboardCardClassName,
  dashboardCardContentClassName,
} from "@/features/dashboard/ui/dashboard-card-header";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";

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
    <Card className={cn("flex h-full flex-col", dashboardCardClassName)}>
      <DashboardCardHeader icon={Icon} title={title} titleVariant="compact" />
      <CardContent
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          dashboardCardContentClassName
        )}
      >
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
