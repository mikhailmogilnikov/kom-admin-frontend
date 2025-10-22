import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";

// Данные для всех ЖК
const allComplexesData = [
  { status: "Вовремя", count: 420, fill: "var(--chart-1)" },
  { status: "Просрочка 1-7 дней", count: 65, fill: "var(--chart-2)" },
  { status: "Просрочка 8-30 дней", count: 38, fill: "var(--chart-3)" },
  { status: "Просрочка >30 дней", count: 18, fill: "var(--chart-4)" },
];

// Данные по каждому ЖК
const complexesDataById: Record<
  string,
  Array<{ status: string; count: number; fill: string }>
> = {
  "residential-complex-1": [
    { status: "Вовремя", count: 110, fill: "var(--chart-1)" },
    { status: "Просрочка 1-7 дней", count: 16, fill: "var(--chart-2)" },
    { status: "Просрочка 8-30 дней", count: 10, fill: "var(--chart-3)" },
    { status: "Просрочка >30 дней", count: 5, fill: "var(--chart-4)" },
  ],
  "residential-complex-2": [
    { status: "Вовремя", count: 105, fill: "var(--chart-1)" },
    { status: "Просрочка 1-7 дней", count: 17, fill: "var(--chart-2)" },
    { status: "Просрочка 8-30 дней", count: 9, fill: "var(--chart-3)" },
    { status: "Просрочка >30 дней", count: 4, fill: "var(--chart-4)" },
  ],
  "residential-complex-3": [
    { status: "Вовремя", count: 102, fill: "var(--chart-1)" },
    { status: "Просрочка 1-7 дней", count: 16, fill: "var(--chart-2)" },
    { status: "Просрочка 8-30 дней", count: 10, fill: "var(--chart-3)" },
    { status: "Просрочка >30 дней", count: 5, fill: "var(--chart-4)" },
  ],
  "residential-complex-4": [
    { status: "Вовремя", count: 103, fill: "var(--chart-1)" },
    { status: "Просрочка 1-7 дней", count: 16, fill: "var(--chart-2)" },
    { status: "Просрочка 8-30 дней", count: 9, fill: "var(--chart-3)" },
    { status: "Просрочка >30 дней", count: 4, fill: "var(--chart-4)" },
  ],
};

const chartConfig = {
  count: {
    label: "Счетов",
  },
  Вовремя: {
    label: "Вовремя",
    color: "hsl(var(--chart-1))",
  },
  "Просрочка 1-7 дней": {
    label: "Просрочка 1-7 дней",
    color: "hsl(var(--chart-2))",
  },
  "Просрочка 8-30 дней": {
    label: "Просрочка 8-30 дней",
    color: "hsl(var(--chart-3))",
  },
  "Просрочка >30 дней": {
    label: "Просрочка >30 дней",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type PaymentStatusChartProps = {
  selectedComplex?: string;
};

const PERCENT_MULTIPLIER = 100;
const LABEL_FONT_SIZE = 12;

export const PaymentStatusChart = ({
  selectedComplex = "all",
}: PaymentStatusChartProps) => {
  const chartData =
    selectedComplex === "all"
      ? allComplexesData
      : complexesDataById[selectedComplex] || allComplexesData;

  const totalCount = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Статус оплат</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-70" config={chartConfig}>
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${value} счетов (${Math.round((Number(value) / totalCount) * PERCENT_MULTIPLIER)}%)`,
                    name,
                  ]}
                  hideLabel
                />
              }
            />
            <Pie
              data={chartData}
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
                  {Math.round(
                    (payload.count / totalCount) * PERCENT_MULTIPLIER
                  )}
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
