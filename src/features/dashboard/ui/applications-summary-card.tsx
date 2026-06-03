import { ClipboardListIcon } from "lucide-react";
import {
  DashboardCardHeader,
  dashboardCardClassName,
  dashboardCardContentClassName,
} from "@/features/dashboard/ui/dashboard-card-header";
import type { components } from "@/shared/api/schema";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";

type ApplicationsSummary = components["schemas"]["ApplicationsSummaryResponse"];

type StatusStyle = {
  tile: string;
  count: string;
  dot: string;
};

const statusStyles: Record<string, StatusStyle> = {
  opened: {
    tile: "border-blue-500/20 bg-blue-500/5",
    count: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  waiting: {
    tile: "border-amber-500/20 bg-amber-500/5",
    count: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  postponed: {
    tile: "border-border bg-muted/40",
    count: "text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  closed: {
    tile: "border-green-500/20 bg-green-500/5",
    count: "text-green-700 dark:text-green-400",
    dot: "bg-green-500",
  },
};

const defaultStatusStyle: StatusStyle = {
  tile: "border-border bg-muted/30",
  count: "text-foreground",
  dot: "bg-primary",
};

const getStatusStyle = (status: string): StatusStyle =>
  statusStyles[status.toLowerCase()] ?? defaultStatusStyle;

type ApplicationsSummaryCardProps = {
  summary: ApplicationsSummary;
};

export const ApplicationsSummaryCard = ({
  summary,
}: ApplicationsSummaryCardProps) => {
  const totalCount = summary.items.reduce((sum, row) => sum + row.count, 0);

  return (
    <Card className={cn("flex h-full flex-col", dashboardCardClassName)}>
      <DashboardCardHeader icon={ClipboardListIcon} title="Заявки" />
      <CardContent
        className={cn(
          "flex flex-1 flex-col gap-5",
          dashboardCardContentClassName
        )}
      >
        <div className="flex items-center justify-between gap-4 rounded-xl border bg-linear-to-br from-primary/5 via-background to-muted/30 p-5">
          <div className="space-y-1">
            <p className="font-bold text-4xl tabular-nums tracking-tight">
              {summary.activeCount}
            </p>
            <p className="text-muted-foreground text-sm">активных заявок</p>
            <p className="text-muted-foreground text-xs">
              {totalCount.toLocaleString("ru-RU")} всего в выборке
            </p>
          </div>
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm">
            <ClipboardListIcon className="size-6 text-primary" />
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3">
          {summary.items.map((row) => {
            const style = getStatusStyle(row.status);

            return (
              <div
                className={cn(
                  "flex flex-col justify-between gap-3 rounded-lg border p-4",
                  style.tile
                )}
                key={row.status}
              >
                <div className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full",
                      style.dot
                    )}
                  />
                  <div className="min-w-0 space-y-0.5">
                    <p className="font-medium text-sm leading-tight">
                      {row.label}
                    </p>
                    {row.hint ? (
                      <p className="text-muted-foreground text-xs">
                        {row.hint}
                      </p>
                    ) : null}
                  </div>
                </div>
                <p
                  className={cn(
                    "font-bold text-2xl tabular-nums tracking-tight",
                    style.count
                  )}
                >
                  {row.count.toLocaleString("ru-RU")}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
