import { buildDashboardQuery } from "@/features/dashboard/lib/build-dashboard-query";
import { fetchQuery } from "@/shared/api/fetch";

import type { DashboardFilters } from "./dashboard-filters.type";

const SECONDS_IN_MS = 1000;
const STALE_TIME_SECONDS = 30;
const STALE_TIME_MS = STALE_TIME_SECONDS * SECONDS_IN_MS;

export const useDashboard = (filters: DashboardFilters) =>
  fetchQuery.useQuery(
    "get",
    "/dashboard",
    {
      params: {
        query: buildDashboardQuery(filters),
      },
    },
    {
      placeholderData: (previousData) => previousData,
      staleTime: STALE_TIME_MS,
    }
  );
