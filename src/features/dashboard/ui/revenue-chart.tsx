import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";

// Данные по всем ЖК (агрегированные)
const allComplexesData = [
  { month: "Янв", revenue: 10_500, expenses: 4200 },
  { month: "Фев", revenue: 11_200, expenses: 4800 },
  { month: "Мар", revenue: 10_800, expenses: 4500 },
  { month: "Апр", revenue: 12_100, expenses: 5100 },
  { month: "Май", revenue: 11_800, expenses: 4900 },
  { month: "Июн", revenue: 12_500, expenses: 5200 },
];

// Данные по каждому ЖК отдельно
const complexesDataById: Record<
  string,
  Array<{ month: string; revenue: number; expenses: number }>
> = {
  "residential-complex-1": [
    { month: "Янв", revenue: 3200, expenses: 1100 },
    { month: "Фев", revenue: 3400, expenses: 1200 },
    { month: "Мар", revenue: 3100, expenses: 1000 },
    { month: "Апр", revenue: 3600, expenses: 1300 },
    { month: "Май", revenue: 3500, expenses: 1250 },
    { month: "Июн", revenue: 3700, expenses: 1400 },
  ],
  "residential-complex-2": [
    { month: "Янв", revenue: 2800, expenses: 900 },
    { month: "Фев", revenue: 2900, expenses: 950 },
    { month: "Мар", revenue: 2700, expenses: 850 },
    { month: "Апр", revenue: 3100, expenses: 1000 },
    { month: "Май", revenue: 3000, expenses: 980 },
    { month: "Июн", revenue: 3200, expenses: 1100 },
  ],
  "residential-complex-3": [
    { month: "Янв", revenue: 2500, expenses: 1000 },
    { month: "Фев", revenue: 2700, expenses: 1100 },
    { month: "Мар", revenue: 2600, expenses: 1050 },
    { month: "Апр", revenue: 2900, expenses: 1200 },
    { month: "Май", revenue: 2800, expenses: 1150 },
    { month: "Июн", revenue: 3000, expenses: 1250 },
  ],
  "residential-complex-4": [
    { month: "Янв", revenue: 2000, expenses: 700 },
    { month: "Фев", revenue: 2200, expenses: 800 },
    { month: "Мар", revenue: 2400, expenses: 850 },
    { month: "Апр", revenue: 2500, expenses: 900 },
    { month: "Май", revenue: 2500, expenses: 850 },
    { month: "Июн", revenue: 2600, expenses: 950 },
  ],
};

const chartConfig = {
  revenue: {
    label: "Доход",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Расходы",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type RevenueChartProps = {
  selectedComplex?: string;
};

export const RevenueChart = ({
  selectedComplex = "all",
}: RevenueChartProps) => {
  const chartData =
    selectedComplex === "all"
      ? allComplexesData
      : complexesDataById[selectedComplex] || allComplexesData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Финансовая динамика</CardTitle>
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
            <ChartTooltip
              content={<ChartTooltipContent indicator="dot" />}
              cursor={false}
            />
            <Area
              dataKey="revenue"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              radius={8}
              stroke="var(--color-revenue)"
              type="natural"
            />
            <Area
              dataKey="expenses"
              fill="var(--color-expenses)"
              fillOpacity={0.4}
              radius={8}
              stroke="var(--color-expenses)"
              type="natural"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
