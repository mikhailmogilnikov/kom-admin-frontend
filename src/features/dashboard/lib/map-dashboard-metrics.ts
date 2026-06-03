import type { LucideIcon } from "lucide-react";
import {
  Building2Icon,
  DollarSignIcon,
  HomeIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

import type { components } from "@/shared/api/schema";

import { formatMoney } from "./format-money";

type DashboardMetrics = components["schemas"]["DashboardMetricsResponse"];

export type DashboardMetricCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  snapshotCaption?: string;
};

export const mapDashboardMetrics = (
  metrics: DashboardMetrics
): DashboardMetricCardProps[] => [
  {
    title: "Всего объектов",
    value: metrics.totalUnits,
    icon: Building2Icon,
    snapshotCaption: metrics.totalUnitsCaption,
  },
  {
    title: "Занятость",
    value: `${metrics.occupancy.percent}%`,
    description: `${metrics.occupancy.occupied} из ${metrics.occupancy.total} квартир`,
    icon: HomeIcon,
    snapshotCaption: metrics.occupancyCaption,
  },
  {
    title: "Доход за месяц",
    value: formatMoney(metrics.monthlyRevenue),
    description: "Общая прибыль",
    icon: DollarSignIcon,
    trend: {
      value: metrics.trends.monthlyRevenue.value,
      isPositive: metrics.trends.monthlyRevenue.isPositive,
    },
  },
  {
    title: "Средняя ставка",
    value: formatMoney(metrics.averageRate),
    description: "Средняя ставка по договорам",
    icon: TrendingUpIcon,
    trend: {
      value: metrics.trends.averageRate.value,
      isPositive: metrics.trends.averageRate.isPositive,
    },
  },
  {
    title: "Активных арендаторов",
    value: metrics.activeTenants,
    description: "Текущие жильцы",
    icon: UsersIcon,
    trend: {
      value: metrics.trends.activeTenants.value,
      isPositive: metrics.trends.activeTenants.isPositive,
    },
  },
];
