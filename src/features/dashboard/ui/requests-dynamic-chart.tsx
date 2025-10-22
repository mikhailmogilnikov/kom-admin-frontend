import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";

// Данные по всем ЖК (агрегированные)
const allComplexesData = [
  { month: "Янв", created: 245, closed: 220, inProgress: 25 },
  { month: "Фев", created: 268, closed: 242, inProgress: 51 },
  { month: "Мар", created: 252, closed: 238, inProgress: 65 },
  { month: "Апр", created: 280, closed: 265, inProgress: 80 },
  { month: "Май", created: 275, closed: 268, inProgress: 87 },
  { month: "Июн", created: 290, closed: 280, inProgress: 97 },
];

// Данные по каждому ЖК отдельно
const complexesDataById: Record<
  string,
  Array<{ month: string; created: number; closed: number; inProgress: number }>
> = {
  "residential-complex-1": [
    { month: "Янв", created: 65, closed: 58, inProgress: 7 },
    { month: "Фев", created: 72, closed: 65, inProgress: 14 },
    { month: "Мар", created: 68, closed: 64, inProgress: 18 },
    { month: "Апр", created: 75, closed: 71, inProgress: 22 },
    { month: "Май", created: 73, closed: 72, inProgress: 23 },
    { month: "Июн", created: 78, closed: 75, inProgress: 26 },
  ],
  "residential-complex-2": [
    { month: "Янв", created: 60, closed: 54, inProgress: 6 },
    { month: "Фев", created: 65, closed: 59, inProgress: 12 },
    { month: "Мар", created: 62, closed: 58, inProgress: 16 },
    { month: "Апр", created: 68, closed: 64, inProgress: 20 },
    { month: "Май", created: 67, closed: 65, inProgress: 22 },
    { month: "Июн", created: 70, closed: 68, inProgress: 24 },
  ],
  "residential-complex-3": [
    { month: "Янв", created: 58, closed: 52, inProgress: 6 },
    { month: "Фев", created: 63, closed: 56, inProgress: 13 },
    { month: "Мар", created: 60, closed: 56, inProgress: 17 },
    { month: "Апр", created: 65, closed: 61, inProgress: 21 },
    { month: "Май", created: 64, closed: 62, inProgress: 23 },
    { month: "Июн", created: 68, closed: 65, inProgress: 26 },
  ],
  "residential-complex-4": [
    { month: "Янв", created: 62, closed: 56, inProgress: 6 },
    { month: "Фев", created: 68, closed: 62, inProgress: 12 },
    { month: "Мар", created: 62, closed: 60, inProgress: 14 },
    { month: "Апр", created: 72, closed: 69, inProgress: 17 },
    { month: "Май", created: 71, closed: 69, inProgress: 19 },
    { month: "Июн", created: 74, closed: 72, inProgress: 21 },
  ],
};

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
  selectedComplex?: string;
};

export const RequestsDynamicChart = ({
  selectedComplex = "all",
}: RequestsDynamicChartProps) => {
  const chartData =
    selectedComplex === "all"
      ? allComplexesData
      : complexesDataById[selectedComplex] || allComplexesData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Динамика заявок</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-70" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
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
};
