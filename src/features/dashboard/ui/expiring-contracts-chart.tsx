import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import type { ExpiringChartRow } from "@/features/dashboard/lib/map-dashboard-charts";
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
  count: {
    label: "Договоров",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const contractPlural = new Intl.PluralRules("ru-RU");

const contractWordForms = {
  one: "договор",
  few: "договора",
  many: "договоров",
  other: "договоров",
} as const;

const pluralizeContracts = (count: number) => {
  const rule = contractPlural.select(count);

  if (rule === "one" || rule === "few" || rule === "many" || rule === "other") {
    return contractWordForms[rule];
  }

  return contractWordForms.other;
};

type ExpiringContractsChartProps = {
  title: string;
  withinDays: number;
  totalCount: number;
  data: ExpiringChartRow[];
};

export const ExpiringContractsChart = ({
  title,
  withinDays,
  totalCount,
  data,
}: ExpiringContractsChartProps) => {
  const chartData = data.filter((row) => row.count > 0);
  const description =
    totalCount === 0
      ? `В ближайшие ${withinDays} дней нет окончаний`
      : `${totalCount} ${pluralizeContracts(totalCount)} в ближайшие ${withinDays} дней`;

  return (
    <Card className={dashboardChartCardClassName}>
      <DashboardCardHeader description={description} title={title} />
      <CardContent className={dashboardChartCardContentClassName}>
        {totalCount === 0 ? (
          <p className="flex h-70 items-center justify-center text-muted-foreground text-sm">
            Всё в порядке — продлений не требуется
          </p>
        ) : (
          <ChartContainer className="h-70" config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="name"
                tick={{ fontSize: 11 }}
                tickLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                content={(props) => (
                  <BarCategoryTooltip<ExpiringChartRow>
                    {...props}
                    renderDetails={(row) => (
                      <>
                        <span className="font-medium text-foreground">
                          {row.count}
                        </span>
                        {` ${pluralizeContracts(row.count)} в ближайшие ${withinDays} дн.`}
                      </>
                    )}
                  />
                )}
              />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                maxBarSize={40}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
