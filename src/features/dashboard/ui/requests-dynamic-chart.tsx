import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import type { RequestsDynamicRow } from "@/features/dashboard/lib/map-dashboard-charts";
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
  created: {
    label: "Создано",
    color: "var(--chart-1)",
  },
  closed: {
    label: "Закрыто",
    color: "var(--chart-2)",
  },
  inProgress: {
    label: "В работе",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

type RequestsDynamicChartProps = {
  data: RequestsDynamicRow[];
};

export const RequestsDynamicChart = ({ data }: RequestsDynamicChartProps) => (
  <Card className={dashboardChartCardClassName}>
    <DashboardCardHeader title="Динамика заявок" />
    <CardContent className={dashboardChartCardContentClassName}>
      <ChartContainer className="h-70" config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="month"
            tickLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            dataKey="created"
            fill="var(--color-created)"
            fillOpacity={0.4}
            radius={8}
            stroke="var(--color-created)"
            type="natural"
          />
          <Area
            dataKey="closed"
            fill="var(--color-closed)"
            fillOpacity={0.4}
            radius={8}
            stroke="var(--color-closed)"
            type="natural"
          />
          <Area
            dataKey="inProgress"
            fill="var(--color-inProgress)"
            fillOpacity={0.4}
            radius={8}
            stroke="var(--color-inProgress)"
            type="natural"
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
