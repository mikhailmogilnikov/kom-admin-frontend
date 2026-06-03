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
    label: "Счетов",
  },
  PAYED: {
    label: "Оплачено",
    color: "hsl(var(--chart-1))",
  },
  WAITING: {
    label: "Ожидается",
    color: "hsl(var(--chart-2))",
  },
  PENDING: {
    label: "В процессе",
    color: "hsl(var(--chart-3))",
  },
  OVERDUE: {
    label: "Просрочено",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type PaymentStatusChartProps = {
  data: PieChartRow[];
};

const PERCENT_MULTIPLIER = 100;
const LABEL_FONT_SIZE = 12;

export const PaymentStatusChart = ({ data }: PaymentStatusChartProps) => {
  const visibleData = data.filter((item) => item.count > 0);
  const totalCount = visibleData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className={dashboardChartCardClassName}>
      <DashboardCardHeader title="Статус оплат" />
      <CardContent className={dashboardChartCardContentClassName}>
        <ChartContainer className="h-70" config={chartConfig}>
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    `${value} счетов (${totalCount > 0 ? Math.round((Number(value) / totalCount) * PERCENT_MULTIPLIER) : 0}%)`,
                  ]}
                  nameKey="status"
                />
              }
            />
            <Pie
              data={visibleData}
              dataKey="count"
              label={({ payload, ...props }) => (
                <text
                  cx={props.cx}
                  cy={props.cy}
                  fill="var(--foreground)"
                  fontSize={LABEL_FONT_SIZE}
                  fontWeight="bold"
                  textAnchor={props.textAnchor}
                  x={props.x}
                  y={props.y}
                >
                  {totalCount > 0
                    ? Math.round(
                        (payload.count / totalCount) * PERCENT_MULTIPLIER
                      )
                    : 0}
                  %
                </text>
              )}
              nameKey="status"
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              verticalAlign="bottom"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
