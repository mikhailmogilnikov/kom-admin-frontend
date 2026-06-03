import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import type { RevenueChartRow } from "@/features/dashboard/lib/map-dashboard-charts";
import {
  DashboardCardHeader,
  dashboardChartCardClassName,
  dashboardChartCardContentClassName,
} from "@/features/dashboard/ui/dashboard-card-header";
import { Card, CardContent } from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";

const chartConfig = {
  revenue: {
    label: "Доход от аренды",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type RevenueChartProps = {
  data: RevenueChartRow[];
};

export const RevenueChart = ({ data }: RevenueChartProps) => (
  <Card className={dashboardChartCardClassName}>
    <DashboardCardHeader title="Доход от аренды" />
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
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="revenue"
            fill="var(--color-revenue)"
            fillOpacity={0.4}
            stroke="var(--color-revenue)"
            type="monotone"
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
