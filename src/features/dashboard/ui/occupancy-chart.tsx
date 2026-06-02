import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { BarCategoryTooltip } from "@/features/dashboard/ui/bar-category-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/shared/ui/chart";

// Данные по ЖК (для просмотра "Все комплексы")
const complexesData = [
  { name: "Солнечный город", occupancy: 85, total: 24 },
  { name: "Зеленый квартал", occupancy: 92, total: 18 },
  { name: "Речной берег", occupancy: 78, total: 22 },
  { name: "Парковый", occupancy: 95, total: 18 },
];

// Данные по домам для каждого ЖК
const buildingsByComplex: Record<
  string,
  Array<{ name: string; occupancy: number; total: number }>
> = {
  "1": [
    { name: "Дом 1", occupancy: 80, total: 10 },
    { name: "Дом 2", occupancy: 86, total: 7 },
    { name: "Дом 3", occupancy: 88, total: 8 },
  ],
  "2": [
    { name: "Дом 1", occupancy: 90, total: 10 },
    { name: "Дом 2", occupancy: 100, total: 8 },
  ],
  "3": [
    { name: "Дом 1", occupancy: 78, total: 9 },
    { name: "Дом 2", occupancy: 75, total: 8 },
    { name: "Дом 3", occupancy: 83, total: 6 },
  ],
  "4": [
    { name: "Дом 1", occupancy: 100, total: 9 },
    { name: "Дом 2", occupancy: 89, total: 9 },
  ],
};

const chartConfig = {
  occupancy: {
    label: "Занятость",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type OccupancyChartProps = {
  selectedComplex?: string;
};

const PERCENT_MULTIPLIER = 100;

type OccupancyRow = {
  name: string;
  occupancy: number;
  total: number;
};

const occupiedFromRow = (row: OccupancyRow) =>
  Math.round((row.occupancy * row.total) / PERCENT_MULTIPLIER);

export const OccupancyChart = ({
  selectedComplex = "all",
}: OccupancyChartProps) => {
  const isAllComplexes = selectedComplex === "all";
  const chartData = isAllComplexes
    ? complexesData
    : buildingsByComplex[selectedComplex] || [];

  const title = isAllComplexes ? "Занятость ЖК" : "Занятость по домам";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-70" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="name"
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              content={(props) => (
                <BarCategoryTooltip<OccupancyRow>
                  {...props}
                  renderDetails={(row) => (
                    <>
                      <span className="font-medium text-foreground">
                        {row.occupancy}%
                      </span>
                      {` занятость · ${occupiedFromRow(row)} из ${row.total} квартир`}
                    </>
                  )}
                />
              )}
            />
            <Bar dataKey="occupancy" fill="var(--color-occupancy)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
