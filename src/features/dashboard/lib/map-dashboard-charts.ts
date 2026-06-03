import type { components } from "@/shared/api/schema";

import { moneyToMajor } from "./format-money";

type OccupancyChartItem = components["schemas"]["OccupancyChartItemResponse"];
type FlatsByStatusChartItem =
  components["schemas"]["FlatsByStatusChartItemResponse"];
type PaymentStatusChartItem =
  components["schemas"]["PaymentStatusChartItemResponse"];
type RentIncomeChartItem = components["schemas"]["RentIncomeChartItemResponse"];
type PaymentsDynamicChartItem =
  components["schemas"]["PaymentsDynamicChartItemResponse"];
type RequestsDynamicChartItem =
  components["schemas"]["RequestsDynamicChartItemResponse"];
type ExpiringContractsChart =
  components["schemas"]["ExpiringContractsChartResponse"];

export type OccupancyChartRow = {
  name: string;
  occupancy: number;
  total: number;
};

export type RevenueChartRow = {
  month: string;
  revenue: number;
};

export type PaymentsDynamicRow = {
  month: string;
  paid: number;
  unpaid: number;
};

export type RequestsDynamicRow = {
  month: string;
  created: number;
  closed: number;
  inProgress: number;
};

export type PieChartRow = {
  status: string;
  count: number;
  fill: string;
};

export type ExpiringChartRow = {
  name: string;
  count: number;
};

const FLAT_STATUS_FILLS: Record<string, string> = {
  occupied: "var(--chart-1)",
  unoccupied: "var(--chart-2)",
  renovating: "var(--chart-3)",
};

const PAYMENT_STATUS_FILLS: Record<string, string> = {
  payed: "var(--chart-1)",
  waiting: "var(--chart-2)",
  pending: "var(--chart-3)",
  overdue: "var(--chart-4)",
};

const normalizeStatusKey = (status: string): string =>
  status.trim().toLowerCase();

export const mapOccupancyChart = (
  items: OccupancyChartItem[]
): OccupancyChartRow[] =>
  items.map((item) => ({
    name: item.name,
    occupancy: item.occupancyPercent,
    total: item.totalUnits,
  }));

export const mapRentIncomeChart = (
  items: RentIncomeChartItem[]
): RevenueChartRow[] =>
  items.map((item) => ({
    month: item.periodLabel,
    revenue: moneyToMajor(item.revenue),
  }));

export const mapPaymentsDynamicChart = (
  items: PaymentsDynamicChartItem[]
): PaymentsDynamicRow[] =>
  items.map((item) => ({
    month: item.periodLabel,
    paid: item.paid,
    unpaid: item.unpaid,
  }));

export const mapRequestsDynamicChart = (
  items: RequestsDynamicChartItem[]
): RequestsDynamicRow[] =>
  items.map((item) => ({
    month: item.periodLabel,
    created: item.created,
    closed: item.closed,
    inProgress: item.inProgress,
  }));

export const mapFlatsByStatusChart = (
  items: FlatsByStatusChartItem[]
): PieChartRow[] =>
  items.map((item) => {
    const key = normalizeStatusKey(item.status);
    return {
      status: key.toUpperCase(),
      count: item.count,
      fill: FLAT_STATUS_FILLS[key] ?? "var(--chart-4)",
    };
  });

export const mapPaymentStatusChart = (
  items: PaymentStatusChartItem[]
): PieChartRow[] =>
  items.map((item) => {
    const key = normalizeStatusKey(item.status);
    return {
      status: key.toUpperCase(),
      count: item.count,
      fill: PAYMENT_STATUS_FILLS[key] ?? "var(--chart-4)",
    };
  });

export const mapExpiringContractsChart = (
  chart: ExpiringContractsChart
): { withinDays: number; totalCount: number; items: ExpiringChartRow[] } => ({
  withinDays: chart.withinDays,
  totalCount: chart.totalCount,
  items: chart.items.map((item) => ({
    name: item.name,
    count: item.count,
  })),
});

export const getOccupancyChartTitle = (isAllComplexes: boolean): string =>
  isAllComplexes ? "Занятость ЖК" : "Занятость по домам";

export const getExpiringChartTitle = (isAllComplexes: boolean): string =>
  isAllComplexes ? "Истекающие договоры" : "Истекающие договоры по домам";
