import { Pie, PieChart } from "recharts";

import type { PieChartRow } from "@/features/dashboard/lib/map-dashboard-charts";
import {
  DashboardCardHeader,
  dashboardChartCardClassName,
  dashboardChartCardContentClassName,
} from "@/features/dashboard/ui/dashboard-card-header";
import { Card, CardContent } from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";

const chartConfig = {
  count: {
    label: "Квартир",
  },
  OCCUPIED: {
    label: "Занята",
    color: "var(--chart-1)",
  },
  UNOCCUPIED: {
    label: "Свободна",
    color: "var(--chart-2)",
  },
  RENOVATING: {
    label: "Ремонт",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

type FlatStatusChartProps = {
  data: PieChartRow[];
};

const PERCENT_MULTIPLIER = 100;
const LABEL_FONT_SIZE = 12;

export const FlatStatusChart = ({ data }: FlatStatusChartProps) => {
  const visibleData = data.filter((item) => item.count > 0);

  return (
    <Card className={dashboardChartCardClassName}>
      <DashboardCardHeader title="Статусы квартир" />
      <CardContent className={dashboardChartCardContentClassName}>
        {visibleData.length === 0 ? (
          <p className="flex h-70 shrink-0 items-center justify-center text-muted-foreground text-sm">
            Нет данных по статусам квартир
          </p>
        ) : (
          <ChartContainer
            className="mx-auto h-70 w-full max-w-[300px] shrink-0"
            config={chartConfig}
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="status" />}
              />
              <Pie
                cx="50%"
                cy="50%"
                data={visibleData}
                dataKey="count"
                innerRadius={60}
                label={({ percent }) =>
                  `${(percent * PERCENT_MULTIPLIER).toFixed(0)}%`
                }
                labelLine={false}
                nameKey="status"
                outerRadius={80}
                strokeWidth={2}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                wrapperStyle={{ fontSize: LABEL_FONT_SIZE }}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
