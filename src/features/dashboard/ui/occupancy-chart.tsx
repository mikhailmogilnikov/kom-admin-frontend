import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { OccupancyChartRow } from "@/features/dashboard/lib/map-dashboard-charts";
import {
  getOccupancyChartHeight,
  getOccupancyYAxisWidth,
} from "@/features/dashboard/lib/occupancy-chart-layout";
import { BarCategoryTooltip } from "@/features/dashboard/ui/bar-category-tooltip";
import {
  DashboardCardHeader,
  dashboardChartCardClassName,
  dashboardChartCardContentClassName,
} from "@/features/dashboard/ui/dashboard-card-header";
import { Card, CardContent } from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/shared/ui/chart";

const chartConfig = {
  occupancy: {
    label: "Занятость",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const OCCUPANCY_DOMAIN_MAX = 100;

type OccupancyChartProps = {
  title: string;
  data: OccupancyChartRow[];
};

const PERCENT_MULTIPLIER = 100;

const occupiedFromRow = (row: OccupancyChartRow) =>
  Math.round((row.occupancy * row.total) / PERCENT_MULTIPLIER);

export const OccupancyChart = ({ title, data }: OccupancyChartProps) => {
  const yAxisWidth = useMemo(() => getOccupancyYAxisWidth(data), [data]);
  const chartHeight = useMemo(
    () => getOccupancyChartHeight(data.length),
    [data.length]
  );

  return (
    <Card className={dashboardChartCardClassName}>
      <DashboardCardHeader title={title} />
      <CardContent className={dashboardChartCardContentClassName}>
        <ChartContainer
          className="w-full"
          config={chartConfig}
          style={{ height: chartHeight }}
        >
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ bottom: 8, left: 4, right: 16, top: 8 }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis
              axisLine={false}
              domain={[0, OCCUPANCY_DOMAIN_MAX]}
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              type="number"
            />
            <YAxis
              axisLine={false}
              dataKey="name"
              interval={0}
              tick={{ fontSize: 11 }}
              tickLine={false}
              type="category"
              width={yAxisWidth}
            />
            <ChartTooltip
              content={(props) => (
                <BarCategoryTooltip<OccupancyChartRow>
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
            <Bar
              dataKey="occupancy"
              fill="var(--color-occupancy)"
              layout="vertical"
              maxBarSize={28}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
