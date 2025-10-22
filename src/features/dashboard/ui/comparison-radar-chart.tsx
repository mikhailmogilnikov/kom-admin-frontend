import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";

// Данные для сравнения всех ЖК
const allComplexesData = [
  {
    metric: "Заселенность",
    "ЖК Солнечный": 85,
    "ЖК Зеленый": 92,
    "ЖК Речной": 78,
    "ЖК Парковый": 95,
  },
  {
    metric: "Своевременность",
    "ЖК Солнечный": 82,
    "ЖК Зеленый": 88,
    "ЖК Речной": 75,
    "ЖК Парковый": 90,
  },
  {
    metric: "Обработка заявок",
    "ЖК Солнечный": 90,
    "ЖК Зеленый": 85,
    "ЖК Речной": 80,
    "ЖК Парковый": 92,
  },
  {
    metric: "Скорость обработки",
    "ЖК Солнечный": 78,
    "ЖК Зеленый": 82,
    "ЖК Речной": 88,
    "ЖК Парковый": 85,
  },
  {
    metric: "Доходность",
    "ЖК Солнечный": 88,
    "ЖК Зеленый": 90,
    "ЖК Речной": 82,
    "ЖК Парковый": 92,
  },
];

// Данные для сравнения домов внутри каждого ЖК
const complexesDataById: Record<
  string,
  Array<{
    metric: string;
    [key: string]: string | number;
  }>
> = {
  "residential-complex-1": [
    { metric: "Заселенность", "Дом 1": 80, "Дом 2": 86, "Дом 3": 88 },
    { metric: "Своевременность", "Дом 1": 78, "Дом 2": 84, "Дом 3": 85 },
    { metric: "Обработка заявок", "Дом 1": 88, "Дом 2": 90, "Дом 3": 92 },
    { metric: "Скорость обработки", "Дом 1": 75, "Дом 2": 78, "Дом 3": 82 },
    { metric: "Доходность", "Дом 1": 85, "Дом 2": 88, "Дом 3": 90 },
  ],
  "residential-complex-2": [
    { metric: "Заселенность", "Дом 1": 90, "Дом 2": 94 },
    { metric: "Своевременность", "Дом 1": 86, "Дом 2": 90 },
    { metric: "Обработка заявок", "Дом 1": 82, "Дом 2": 88 },
    { metric: "Скорость обработки", "Дом 1": 80, "Дом 2": 84 },
    { metric: "Доходность", "Дом 1": 88, "Дом 2": 92 },
  ],
  "residential-complex-3": [
    { metric: "Заселенность", "Дом 1": 78, "Дом 2": 75, "Дом 3": 80 },
    { metric: "Своевременность", "Дом 1": 72, "Дом 2": 75, "Дом 3": 78 },
    { metric: "Обработка заявок", "Дом 1": 78, "Дом 2": 80, "Дом 3": 82 },
    { metric: "Скорость обработки", "Дом 1": 85, "Дом 2": 88, "Дом 3": 90 },
    { metric: "Доходность", "Дом 1": 80, "Дом 2": 82, "Дом 3": 84 },
  ],
  "residential-complex-4": [
    { metric: "Заселенность", "Дом 1": 96, "Дом 2": 94 },
    { metric: "Своевременность", "Дом 1": 88, "Дом 2": 92 },
    { metric: "Обработка заявок", "Дом 1": 90, "Дом 2": 94 },
    { metric: "Скорость обработки", "Дом 1": 82, "Дом 2": 88 },
    { metric: "Доходность", "Дом 1": 90, "Дом 2": 94 },
  ],
};

const allComplexesConfig = {
  "ЖК Солнечный": {
    label: "ЖК Солнечный город",
    color: "var(--chart-1)",
  },
  "ЖК Зеленый": {
    label: "ЖК Зеленый квартал",
    color: "var(--chart-2)",
  },
  "ЖК Речной": {
    label: "ЖК Речной берег",
    color: "var(--chart-3)",
  },
  "ЖК Парковый": {
    label: "ЖК Парковый",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const complexChartConfigs: Record<string, ChartConfig> = {
  "residential-complex-1": {
    "Дом 1": { label: "Дом 1", color: "var(--chart-1)" },
    "Дом 2": { label: "Дом 2", color: "var(--chart-2)" },
    "Дом 3": { label: "Дом 3", color: "var(--chart-3)" },
  },
  "residential-complex-2": {
    "Дом 1": { label: "Дом 1", color: "var(--chart-1)" },
    "Дом 2": { label: "Дом 2", color: "var(--chart-2)" },
  },
  "residential-complex-3": {
    "Дом 1": { label: "Дом 1", color: "var(--chart-1)" },
    "Дом 2": { label: "Дом 2", color: "var(--chart-2)" },
    "Дом 3": { label: "Дом 3", color: "var(--chart-3)" },
  },
  "residential-complex-4": {
    "Дом 1": { label: "Дом 1", color: "var(--chart-1)" },
    "Дом 2": { label: "Дом 2", color: "var(--chart-2)" },
  },
};

type ComparisonRadarChartProps = {
  selectedComplex?: string;
};

export const ComparisonRadarChart = ({
  selectedComplex = "all",
}: ComparisonRadarChartProps) => {
  const isAllComplexes = selectedComplex === "all";
  const chartData = isAllComplexes
    ? allComplexesData
    : complexesDataById[selectedComplex] || allComplexesData;

  const chartConfig = isAllComplexes
    ? allComplexesConfig
    : complexChartConfigs[selectedComplex] || allComplexesConfig;

  const title = isAllComplexes
    ? "Сравнение жилых комплексов"
    : "Сравнение домов";

  const dataKeys = Object.keys(chartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-70" config={chartConfig}>
          <RadarChart data={chartData}>
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
            />
            <PolarAngleAxis dataKey="metric" />
            <PolarGrid />
            <ChartLegend content={<ChartLegendContent />} />
            {dataKeys.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];
              return (
                <Radar
                  dataKey={key}
                  fill={config.color}
                  fillOpacity={0.6}
                  key={key}
                  stroke={config.color}
                  strokeWidth={2}
                />
              );
            })}
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
