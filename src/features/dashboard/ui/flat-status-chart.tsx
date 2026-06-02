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

type FlatStatusKey = "OCCUPIED" | "UNOCCUPIED" | "RENOVATING";

// Flat.status — EnumFlatStatus (см. docs/models.rtf)
const allComplexesData: Array<{
  status: FlatStatusKey;
  count: number;
  fill: string;
}> = [
  { status: "OCCUPIED", count: 71, fill: "var(--chart-1)" },
  { status: "UNOCCUPIED", count: 8, fill: "var(--chart-2)" },
  { status: "RENOVATING", count: 3, fill: "var(--chart-3)" },
];

const complexesDataById: Record<
  string,
  Array<{ status: FlatStatusKey; count: number; fill: string }>
> = {
  "1": [
    { status: "OCCUPIED", count: 20, fill: "var(--chart-1)" },
    { status: "UNOCCUPIED", count: 3, fill: "var(--chart-2)" },
    { status: "RENOVATING", count: 1, fill: "var(--chart-3)" },
  ],
  "2": [
    { status: "OCCUPIED", count: 17, fill: "var(--chart-1)" },
    { status: "UNOCCUPIED", count: 2, fill: "var(--chart-2)" },
    { status: "RENOVATING", count: 1, fill: "var(--chart-3)" },
  ],
  "3": [
    { status: "OCCUPIED", count: 18, fill: "var(--chart-1)" },
    { status: "UNOCCUPIED", count: 2, fill: "var(--chart-2)" },
    { status: "RENOVATING", count: 0, fill: "var(--chart-3)" },
  ],
  "4": [
    { status: "OCCUPIED", count: 16, fill: "var(--chart-1)" },
    { status: "UNOCCUPIED", count: 1, fill: "var(--chart-2)" },
    { status: "RENOVATING", count: 1, fill: "var(--chart-3)" },
  ],
};

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
  selectedComplex?: string;
};

const PERCENT_MULTIPLIER = 100;
const LABEL_FONT_SIZE = 12;

export const FlatStatusChart = ({
  selectedComplex = "all",
}: FlatStatusChartProps) => {
  const chartData =
    selectedComplex === "all"
      ? allComplexesData
      : (complexesDataById[selectedComplex] ?? allComplexesData);

  const visibleData = chartData.filter((item) => item.count > 0);

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
