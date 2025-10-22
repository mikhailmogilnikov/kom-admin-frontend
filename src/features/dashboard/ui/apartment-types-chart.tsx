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
  { type: "1-комнатные", count: 156, fill: "var(--chart-1)" },
  { type: "2-комнатные", count: 178, fill: "var(--chart-2)" },
  { type: "3-комнатные", count: 89, fill: "var(--chart-3)" },
  { type: "Студии", count: 45, fill: "var(--chart-4)" },
];

// Данные по каждому ЖК
const complexesDataById: Record<
  string,
  Array<{ type: string; count: number; fill: string }>
> = {
  "residential-complex-1": [
    { type: "1-комнатные", count: 42, fill: "var(--chart-1)" },
    { type: "2-комнатные", count: 48, fill: "var(--chart-2)" },
    { type: "3-комнатные", count: 24, fill: "var(--chart-3)" },
    { type: "Студии", count: 12, fill: "var(--chart-4)" },
  ],
  "residential-complex-2": [
    { type: "1-комнатные", count: 38, fill: "var(--chart-1)" },
    { type: "2-комнатные", count: 45, fill: "var(--chart-2)" },
    { type: "3-комнатные", count: 22, fill: "var(--chart-3)" },
    { type: "Студии", count: 10, fill: "var(--chart-4)" },
  ],
  "residential-complex-3": [
    { type: "1-комнатные", count: 40, fill: "var(--chart-1)" },
    { type: "2-комнатные", count: 42, fill: "var(--chart-2)" },
    { type: "3-комнатные", count: 20, fill: "var(--chart-3)" },
    { type: "Студии", count: 12, fill: "var(--chart-4)" },
  ],
  "residential-complex-4": [
    { type: "1-комнатные", count: 36, fill: "var(--chart-1)" },
    { type: "2-комнатные", count: 43, fill: "var(--chart-2)" },
    { type: "3-комнатные", count: 23, fill: "var(--chart-3)" },
    { type: "Студии", count: 11, fill: "var(--chart-4)" },
  ],
};

const chartConfig = {
  count: {
    label: "Квартир",
  },
  "1-комнатные": {
    label: "1-комнатные",
    color: "var(--chart-1)",
  },
  "2-комнатные": {
    label: "2-комнатные",
    color: "var(--chart-2)",
  },
  "3-комнатные": {
    label: "3-комнатные",
    color: "var(--chart-3)",
  },
  Студии: {
    label: "Студии",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

type ApartmentTypesChartProps = {
  selectedComplex?: string;
};

const PERCENT_MULTIPLIER = 100;
const LABEL_FONT_SIZE = 12;

export const ApartmentTypesChart = ({
  selectedComplex = "all",
}: ApartmentTypesChartProps) => {
  const chartData =
    selectedComplex === "all"
      ? allComplexesData
      : complexesDataById[selectedComplex] || allComplexesData;

  const totalCount = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Распределение по типам квартир</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-70" config={chartConfig}>
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${value} квартир (${Math.round((Number(value) / totalCount) * PERCENT_MULTIPLIER)}%)`,
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
                  fill="white"
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
              nameKey="type"
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="type" />}
              verticalAlign="bottom"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
