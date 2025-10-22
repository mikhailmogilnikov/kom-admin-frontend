import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
  { month: "Янв", paid: 420, unpaid: 45 },
  { month: "Фев", paid: 438, unpaid: 38 },
  { month: "Мар", paid: 445, unpaid: 42 },
  { month: "Апр", paid: 456, unpaid: 35 },
  { month: "Май", paid: 462, unpaid: 40 },
  { month: "Июн", paid: 468, unpaid: 32 },
];

// Данные по каждому ЖК отдельно
const complexesDataById: Record<
  string,
  Array<{ month: string; paid: number; unpaid: number }>
> = {
  "residential-complex-1": [
    { month: "Янв", paid: 110, unpaid: 12 },
    { month: "Фев", paid: 115, unpaid: 10 },
    { month: "Мар", paid: 118, unpaid: 11 },
    { month: "Апр", paid: 120, unpaid: 9 },
    { month: "Май", paid: 122, unpaid: 10 },
    { month: "Июн", paid: 124, unpaid: 8 },
  ],
  "residential-complex-2": [
    { month: "Янв", paid: 105, unpaid: 11 },
    { month: "Фев", paid: 108, unpaid: 9 },
    { month: "Мар", paid: 110, unpaid: 10 },
    { month: "Апр", paid: 112, unpaid: 8 },
    { month: "Май", paid: 114, unpaid: 9 },
    { month: "Июн", paid: 115, unpaid: 7 },
  ],
  "residential-complex-3": [
    { month: "Янв", paid: 102, unpaid: 10 },
    { month: "Фев", paid: 106, unpaid: 9 },
    { month: "Мар", paid: 108, unpaid: 10 },
    { month: "Апр", paid: 110, unpaid: 8 },
    { month: "Май", paid: 112, unpaid: 10 },
    { month: "Июн", paid: 114, unpaid: 8 },
  ],
  "residential-complex-4": [
    { month: "Янв", paid: 103, unpaid: 12 },
    { month: "Фев", paid: 109, unpaid: 10 },
    { month: "Мар", paid: 109, unpaid: 11 },
    { month: "Апр", paid: 114, unpaid: 10 },
    { month: "Май", paid: 114, unpaid: 11 },
    { month: "Июн", paid: 115, unpaid: 9 },
  ],
};

const chartConfig = {
  paid: {
    label: "Оплачено",
    color: "var(--chart-1)",
  },
  unpaid: {
    label: "Неоплачено",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type PaymentsDynamicChartProps = {
  selectedComplex?: string;
};

export const PaymentsDynamicChart = ({
  selectedComplex = "all",
}: PaymentsDynamicChartProps) => {
  const chartData =
    selectedComplex === "all"
      ? allComplexesData
      : complexesDataById[selectedComplex] || allComplexesData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Динамика оплат</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-70" config={chartConfig}>
          <LineChart
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
};
