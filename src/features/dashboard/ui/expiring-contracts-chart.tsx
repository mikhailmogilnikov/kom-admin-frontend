import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { BarCategoryTooltip } from "@/features/dashboard/ui/bar-category-tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/shared/ui/chart";

const WITHIN_DAYS = 30;

type ExpiringRow = {
  name: string;
  count: number;
};

// Contract.end_date в ближайшие withinDays, активные договоры (start_date ≤ сегодня ≤ end_date)
const byComplex: ExpiringRow[] = [
  { name: "Солнечный город", count: 5 },
  { name: "Зеленый квартал", count: 2 },
  { name: "Речной берег", count: 4 },
  { name: "Парковый", count: 1 },
];

const bySector: Record<string, ExpiringRow[]> = {
  "1": [
    { name: "Дом 1", count: 2 },
    { name: "Дом 2", count: 1 },
    { name: "Дом 3", count: 2 },
  ],
  "2": [
    { name: "Дом 1", count: 1 },
    { name: "Дом 2", count: 1 },
  ],
  "3": [
    { name: "Дом 1", count: 2 },
    { name: "Дом 2", count: 1 },
    { name: "Дом 3", count: 1 },
  ],
  "4": [{ name: "Дом 1", count: 1 }],
};

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
  selectedComplex?: string;
};

export const ExpiringContractsChart = ({
  selectedComplex = "all",
}: ExpiringContractsChartProps) => {
  const isAllComplexes = selectedComplex === "all";
  const chartData = (
    isAllComplexes ? byComplex : (bySector[selectedComplex] ?? [])
  ).filter((row) => row.count > 0);

  const totalCount = chartData.reduce((sum, row) => sum + row.count, 0);

  const title = isAllComplexes
    ? "Истекающие договоры"
    : "Истекающие договоры по домам";

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {totalCount === 0
            ? `В ближайшие ${WITHIN_DAYS} дней нет окончаний`
            : `${totalCount} ${pluralizeContracts(totalCount)} в ближайшие ${WITHIN_DAYS} дней`}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  <BarCategoryTooltip<ExpiringRow>
                    {...props}
                    renderDetails={(row) => (
                      <>
                        <span className="font-medium text-foreground">
                          {row.count}
                        </span>
                        {` ${pluralizeContracts(row.count)} в ближайшие ${WITHIN_DAYS} дн.`}
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
