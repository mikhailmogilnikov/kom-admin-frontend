import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export const dashboardCardClassName = "gap-3 p-4";

export const dashboardCardContentClassName = "p-0";

/** Карточки с графиками: на всю высоту ячейки, контент у нижнего края */
export const dashboardChartCardClassName = cn(
  dashboardCardClassName,
  "flex h-full min-h-0 flex-col"
);

export const dashboardChartCardContentClassName = cn(
  dashboardCardContentClassName,
  "flex min-h-0 flex-1 flex-col justify-end"
);

type DashboardCardHeaderProps = {
  title: string;
  icon?: LucideIcon;
  description?: string;
  /** Компактный заголовок — только для верхних метрик */
  titleVariant?: "default" | "compact";
  className?: string;
};

export const DashboardCardHeader = ({
  title,
  icon: Icon,
  description,
  titleVariant = "default",
  className,
}: DashboardCardHeaderProps) => (
  <CardHeader
    className={cn(
      "space-y-0 p-0",
      titleVariant === "default" && "pb-3",
      description
        ? "items-stretch gap-1.5"
        : "flex flex-row items-center justify-between",
      className
    )}
  >
    <div className="flex flex-row items-center justify-between gap-2">
      <CardTitle
        className={cn(
          titleVariant === "compact" && "font-medium text-sm leading-none"
        )}
      >
        {title}
      </CardTitle>
      {Icon ? (
        <Icon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
      ) : null}
    </div>
    {description ? (
      <CardDescription className="leading-snug">{description}</CardDescription>
    ) : null}
  </CardHeader>
);
