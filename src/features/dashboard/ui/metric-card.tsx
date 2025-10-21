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
};

export const MetricCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="font-medium text-sm">{title}</CardTitle>
      <Icon className="size-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="font-bold text-2xl">{value}</div>
      {description && (
        <p className="text-muted-foreground text-xs">{description}</p>
      )}
      {trend && (
        <p
          className={`mt-2 text-xs ${
            trend.isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% от прошлого
          периода
        </p>
      )}
    </CardContent>
  </Card>
);
