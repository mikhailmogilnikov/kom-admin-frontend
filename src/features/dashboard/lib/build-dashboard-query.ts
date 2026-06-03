import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { ALL_COMPLEX_VALUE } from "@/features/dashboard/lib/apartment-complex-options";

import type { DashboardFilters } from "../model/dashboard-filters.type";

const DATE_FORMAT = "yyyy-MM-dd";
const DEFAULT_DAYS_BACK = 30;

export const getDefaultDateRange = (): DateRange => ({
  from: new Date(new Date().setDate(new Date().getDate() - DEFAULT_DAYS_BACK)),
  to: new Date(),
});

export const filtersFromUi = (
  selectedComplex: string,
  dateRange: DateRange
): DashboardFilters | null => {
  if (!(dateRange.from && dateRange.to)) {
    return null;
  }

  return {
    complexId:
      selectedComplex === ALL_COMPLEX_VALUE
        ? undefined
        : Number(selectedComplex),
    dateFrom: format(dateRange.from, DATE_FORMAT),
    dateTo: format(dateRange.to, DATE_FORMAT),
  };
};

export const resolveDashboardFilters = (
  selectedComplex: string,
  dateRange: DateRange
): DashboardFilters => {
  const filters = filtersFromUi(selectedComplex, dateRange);

  if (filters) {
    return filters;
  }

  const fallback = filtersFromUi(selectedComplex, getDefaultDateRange());

  if (!fallback) {
    throw new Error("Dashboard filters require a valid date range");
  }

  return fallback;
};

export const buildDashboardQuery = (filters: DashboardFilters) => ({
  complex_id: filters.complexId ?? null,
  date_from: filters.dateFrom,
  date_to: filters.dateTo,
});
