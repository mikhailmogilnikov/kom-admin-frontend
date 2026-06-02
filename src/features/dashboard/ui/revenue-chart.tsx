import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";

// Transaction.amount по месяцам (без расходов на уровне УК)
const allComplexesData = [
  { month: "Янв", revenue: 10_500 },
  { month: "Фев", revenue: 11_200 },
  { month: "Мар", revenue: 10_800 },
  { month: "Апр", revenue: 12_100 },
  { month: "Май", revenue: 11_800 },
  { month: "Июн", revenue: 12_500 },
];

const complexesDataById: Record<
  string,
  Array<{ month: string; revenue: number }>
> = {
  "1": [
    { month: "Янв", revenue: 3200 },
    { month: "Фев", revenue: 3400 },
    { month: "Мар", revenue: 3100 },
    { month: "Апр", revenue: 3600 },
    { month: "Май", revenue: 3500 },
    { month: "Июн", revenue: 3700 },
  ],
  "2": [
    { month: "Янв", revenue: 2800 },
    { month: "Фев", revenue: 2900 },
    { month: "Мар", revenue: 2700 },
    { month: "Апр", revenue: 3100 },
    { month: "Май", revenue: 3000 },
    { month: "Июн", revenue: 3200 },
  ],
  "3": [
    { month: "Янв", revenue: 2500 },
    { month: "Фев", revenue: 2700 },
    { month: "Мар", revenue: 2600 },
    { month: "Апр", revenue: 2900 },
    { month: "Май", revenue: 2800 },
    { month: "Июн", revenue: 3000 },
  ],
  "4": [
    { month: "Янв", revenue: 2000 },
    { month: "Фев", revenue: 2200 },
    { month: "Мар", revenue: 2400 },
    { month: "Апр", revenue: 2500 },
    { month: "Май", revenue: 2500 },
    { month: "Июн", revenue: 2600 },
  ],
};

const chartConfig = {
  revenue: {
    label: "Доход от аренды",
    color: "var(--chart-1)",
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
      : (complexesDataById[selectedComplex] ?? allComplexesData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Доход от аренды</CardTitle>
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
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
