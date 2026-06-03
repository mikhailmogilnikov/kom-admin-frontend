import { ActivityIcon } from "lucide-react";

import { formatRelativeTime } from "@/features/dashboard/lib/format-relative-time";
import {
  DashboardCardHeader,
  dashboardCardClassName,
  dashboardCardContentClassName,
} from "@/features/dashboard/ui/dashboard-card-header";
import type { components } from "@/shared/api/schema";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";

type RecentActivityItem = components["schemas"]["RecentActivityItemResponse"];

type StatusStyle = {
  tile: string;
  dot: string;
};

const statusStyles: Record<string, StatusStyle> = {
  success: {
    tile: "border-green-500/20 bg-green-500/5",
    dot: "bg-green-500",
  },
  warning: {
    tile: "border-amber-500/20 bg-amber-500/5",
    dot: "bg-amber-500",
  },
  info: {
    tile: "border-blue-500/20 bg-blue-500/5",
    dot: "bg-blue-500",
  },
};

const defaultStatusStyle: StatusStyle = {
  tile: "border-border bg-muted/30",
  dot: "bg-primary",
};

const getStatusStyle = (status: string): StatusStyle =>
  statusStyles[status.toLowerCase()] ?? defaultStatusStyle;

type RecentActivityCardProps = {
  items: RecentActivityItem[];
};

export const RecentActivityCard = ({ items }: RecentActivityCardProps) => (
  <Card className={cn("flex h-full min-h-0 flex-col", dashboardCardClassName)}>
    <DashboardCardHeader icon={ActivityIcon} title="Недавняя активность" />
    <CardContent
      className={cn(
        "flex min-h-0 flex-1 flex-col",
        dashboardCardContentClassName
      )}
    >
      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Нет недавней активности за выбранный период
        </p>
      ) : (
        <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
          {items.map((activity) => {
            const style = getStatusStyle(activity.status);

            return (
              <li
                className={cn(
                  "flex items-start gap-3 rounded-lg border px-4 py-3",
                  style.tile
                )}
                key={`${activity.apartmentLabel}-${activity.occurredAt}-${activity.action}`}
              >
                <span
                  aria-hidden
                  className={cn("mt-1 size-2 shrink-0 rounded-full", style.dot)}
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="font-medium text-sm leading-snug">
                    {activity.apartmentLabel}
                  </p>
                  <p className="text-muted-foreground text-sm leading-snug">
                    {activity.action}
                  </p>
                </div>
                <p className="shrink-0 whitespace-nowrap pt-0.5 text-muted-foreground text-xs tabular-nums">
                  {formatRelativeTime(activity.occurredAt)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </CardContent>
  </Card>
);
