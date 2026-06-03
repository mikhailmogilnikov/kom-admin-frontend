import { Pie, PieChart } from "recharts";

import type { PieChartRow } from "@/features/dashboard/lib/map-dashboard-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle>Статусы квартир</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="mx-auto aspect-square max-h-[300px]"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
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
      </CardContent>
    </Card>
  );
};
