import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import type { PaymentsDynamicRow } from "@/features/dashboard/lib/map-dashboard-charts";
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
  paid: {
    label: "Оплачено",
    color: "var(--chart-1)",
  },
  unpaid: {
    label: "Не оплачено",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type PaymentsDynamicChartProps = {
  data: PaymentsDynamicRow[];
};

export const PaymentsDynamicChart = ({ data }: PaymentsDynamicChartProps) => (
  <Card className={dashboardChartCardClassName}>
    <DashboardCardHeader title="Динамика оплат" />
    <CardContent className={dashboardChartCardContentClassName}>
      <ChartContainer className="h-70" config={chartConfig}>
        <LineChart
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
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            dataKey="paid"
            dot={{
              fill: "var(--color-paid)",
              r: 4,
            }}
            stroke="var(--color-paid)"
            strokeWidth={2}
            type="monotone"
          />
          <Line
            dataKey="unpaid"
            dot={{
              fill: "var(--color-unpaid)",
              r: 4,
            }}
            stroke="var(--color-unpaid)"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
