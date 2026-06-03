import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

import { ALL_COMPLEX_VALUE } from "@/features/dashboard/lib/apartment-complex-options";
import {
  getDefaultDateRange,
  resolveDashboardFilters,
} from "@/features/dashboard/lib/build-dashboard-query";
import {
  getExpiringChartTitle,
  getOccupancyChartTitle,
  mapExpiringContractsChart,
  mapFlatsByStatusChart,
  mapOccupancyChart,
  mapPaymentStatusChart,
  mapPaymentsDynamicChart,
  mapRentIncomeChart,
  mapRequestsDynamicChart,
} from "@/features/dashboard/lib/map-dashboard-charts";
import { mapDashboardMetrics } from "@/features/dashboard/lib/map-dashboard-metrics";
import { useDashboard } from "@/features/dashboard/model/use-dashboard";
import { ApplicationsSummaryCard } from "@/features/dashboard/ui/applications-summary-card";
import { ComplexSelector } from "@/features/dashboard/ui/complex-selector";
import { DateRangePicker } from "@/features/dashboard/ui/date-range-picker";
import { ExpiringContractsChart } from "@/features/dashboard/ui/expiring-contracts-chart";
import { FlatStatusChart } from "@/features/dashboard/ui/flat-status-chart";
import { MetricCard } from "@/features/dashboard/ui/metric-card";
import { OccupancyChart } from "@/features/dashboard/ui/occupancy-chart";
import { PaymentStatusChart } from "@/features/dashboard/ui/payment-status-chart";
import { PaymentsDynamicChart } from "@/features/dashboard/ui/payments-dynamic-chart";
import { RecentActivityCard } from "@/features/dashboard/ui/recent-activity-card";
import { RequestsDynamicChart } from "@/features/dashboard/ui/requests-dynamic-chart";
import { RevenueChart } from "@/features/dashboard/ui/revenue-chart";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";

const METRIC_SKELETON_KEYS = [
  "metric-skeleton-1",
  "metric-skeleton-2",
  "metric-skeleton-3",
  "metric-skeleton-4",
  "metric-skeleton-5",
] as const;

const DashboardComponent = () => {
  const [selectedComplex, setSelectedComplex] = useState(ALL_COMPLEX_VALUE);
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange);

  const filters = useMemo(
    () => resolveDashboardFilters(selectedComplex, dateRange),
    [selectedComplex, dateRange]
  );

  const { data, isPending, isError, isFetching, refetch } =
    useDashboard(filters);

  const isAllComplexes = selectedComplex === ALL_COMPLEX_VALUE;
  const showInitialLoading = isPending && !data;
  const showFetchingIndicator = isFetching && Boolean(data);

  const metrics = data ? mapDashboardMetrics(data.metrics) : [];
  const expiringChart = data
    ? mapExpiringContractsChart(data.expiringContractsChart)
    : null;

  return (
    <div className="flex flex-col gap-6 p-6 max-md:px-4 max-md:py-8">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <div className="flex flex-col gap-2 max-lg:w-full">
          <h1 className="font-bold text-3xl">Дашборд</h1>
          <p className="text-muted-foreground">
            УК "Ключи Москвы" - Управление недвижимостью
          </p>
        </div>
        <div className="flex flex-col items-end gap-4 max-lg:mt-4 max-lg:w-full md:flex-row md:items-end">
          {showFetchingIndicator ? (
            <Spinner aria-label="Обновление данных" className="size-5" />
          ) : null}
          <ComplexSelector onComplexChange={setSelectedComplex} />
          <DateRangePicker
            onDateChange={(range) => {
              if (range?.from && range.to) {
                setDateRange(range);
              }
            }}
          />
        </div>
      </div>

      {isError ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
          <p className="text-destructive text-sm">
            Не удалось загрузить данные дашборда
          </p>
          <Button onClick={() => refetch()} type="button" variant="outline">
            Повторить
          </Button>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {showInitialLoading
          ? METRIC_SKELETON_KEYS.map((key) => (
              <div
                className="h-full min-h-24 animate-pulse rounded-xl border bg-muted/40"
                key={key}
              />
            ))
          : metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
      </div>

      {data ? (
        <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
          <OccupancyChart
            data={mapOccupancyChart(data.occupancyChart)}
            title={getOccupancyChartTitle(isAllComplexes)}
          />

          <RecentActivityCard items={data.recentActivity} />

          <ApplicationsSummaryCard summary={data.applicationsSummary} />

          <FlatStatusChart
            data={mapFlatsByStatusChart(data.flatsByStatusChart)}
          />

          <RevenueChart data={mapRentIncomeChart(data.rentIncomeChart)} />

          <PaymentsDynamicChart
            data={mapPaymentsDynamicChart(data.paymentsDynamicChart)}
          />

          <RequestsDynamicChart
            data={mapRequestsDynamicChart(data.requestsDynamicChart)}
          />

          <PaymentStatusChart
            data={mapPaymentStatusChart(data.paymentStatusChart)}
          />

          {expiringChart ? (
            <ExpiringContractsChart
              data={expiringChart.items}
              title={getExpiringChartTitle(isAllComplexes)}
              totalCount={expiringChart.totalCount}
              withinDays={expiringChart.withinDays}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export const Route = createFileRoute("/_private/")({
  component: DashboardComponent,
});
