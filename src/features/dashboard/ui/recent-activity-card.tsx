import { ActivityIcon } from "lucide-react";

import { formatRelativeTime } from "@/features/dashboard/lib/format-relative-time";
import type { components } from "@/shared/api/schema";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

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
  <Card className="flex h-full min-h-0 flex-col">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="font-medium text-sm">Недавняя активность</CardTitle>
      <ActivityIcon className="size-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="flex shrink-0 items-center justify-between gap-4 rounded-xl border bg-linear-to-br from-primary/5 via-background to-muted/30 p-5">
        <div className="space-y-1">
          <p className="font-bold text-4xl tabular-nums tracking-tight">
            {items.length.toLocaleString("ru-RU")}
          </p>
          <p className="text-muted-foreground text-sm">событий в ленте</p>
          <p className="text-muted-foreground text-xs">
            договоры, заявки и платежи
          </p>
        </div>
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm">
          <ActivityIcon className="size-6 text-primary" />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/20 px-4 py-10 text-center">
          <ActivityIcon className="size-8 text-muted-foreground/60" />
          <p className="font-medium text-sm">Нет недавней активности</p>
          <p className="max-w-xs text-muted-foreground text-xs">
            За выбранный период изменений не зафиксировано
          </p>
        </div>
      ) : (
        <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {items.map((activity) => {
            const style = getStatusStyle(activity.status);

            return (
              <li
                className={cn("flex gap-3 rounded-lg border p-4", style.tile)}
                key={`${activity.apartmentLabel}-${activity.occurredAt}-${activity.action}`}
              >
                <span
                  aria-hidden
                  className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    style.dot
                  )}
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="font-medium text-sm leading-snug">
                    {activity.apartmentLabel}
                  </p>
                  <p className="text-muted-foreground text-sm leading-snug">
                    {activity.action}
                  </p>
                  <p className="text-muted-foreground text-xs tabular-nums">
                    {formatRelativeTime(activity.occurredAt)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </CardContent>
  </Card>
);
