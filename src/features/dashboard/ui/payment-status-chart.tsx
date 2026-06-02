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

type PaymentStatusKey = "PAYED" | "WAITING" | "PENDING" | "OVERDUE";

// ContractPayment.status — EnumContractPaymentStatus
const allComplexesData: Array<{
  status: PaymentStatusKey;
  count: number;
  fill: string;
}> = [
  { status: "PAYED", count: 420, fill: "var(--chart-1)" },
  { status: "WAITING", count: 65, fill: "var(--chart-2)" },
  { status: "PENDING", count: 38, fill: "var(--chart-3)" },
  { status: "OVERDUE", count: 18, fill: "var(--chart-4)" },
];

const complexesDataById: Record<
  string,
  Array<{ status: PaymentStatusKey; count: number; fill: string }>
> = {
  "1": [
    { status: "PAYED", count: 110, fill: "var(--chart-1)" },
    { status: "WAITING", count: 16, fill: "var(--chart-2)" },
    { status: "PENDING", count: 10, fill: "var(--chart-3)" },
    { status: "OVERDUE", count: 5, fill: "var(--chart-4)" },
  ],
  "2": [
    { status: "PAYED", count: 105, fill: "var(--chart-1)" },
    { status: "WAITING", count: 17, fill: "var(--chart-2)" },
    { status: "PENDING", count: 9, fill: "var(--chart-3)" },
    { status: "OVERDUE", count: 4, fill: "var(--chart-4)" },
  ],
  "3": [
    { status: "PAYED", count: 102, fill: "var(--chart-1)" },
    { status: "WAITING", count: 16, fill: "var(--chart-2)" },
    { status: "PENDING", count: 10, fill: "var(--chart-3)" },
    { status: "OVERDUE", count: 5, fill: "var(--chart-4)" },
  ],
  "4": [
    { status: "PAYED", count: 103, fill: "var(--chart-1)" },
    { status: "WAITING", count: 16, fill: "var(--chart-2)" },
    { status: "PENDING", count: 9, fill: "var(--chart-3)" },
    { status: "OVERDUE", count: 4, fill: "var(--chart-4)" },
  ],
};

const chartConfig = {
  count: {
    label: "Счетов",
  },
  PAYED: {
    label: "Оплачено",
    color: "hsl(var(--chart-1))",
  },
  WAITING: {
    label: "Ожидается",
    color: "hsl(var(--chart-2))",
  },
  PENDING: {
    label: "В процессе",
    color: "hsl(var(--chart-3))",
  },
  OVERDUE: {
    label: "Просрочено",
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
      : (complexesDataById[selectedComplex] ?? allComplexesData);

  const visibleData = chartData.filter((item) => item.count > 0);
  const totalCount = visibleData.reduce((sum, item) => sum + item.count, 0);

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
                  formatter={(value) => [
                    `${value} счетов (${Math.round((Number(value) / totalCount) * PERCENT_MULTIPLIER)}%)`,
                  ]}
                  nameKey="status"
                />
              }
            />
            <Pie
              data={visibleData}
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
