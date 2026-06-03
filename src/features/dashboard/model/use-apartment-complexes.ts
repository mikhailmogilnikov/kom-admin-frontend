import { fetchQuery } from "@/shared/api/fetch";

const MINUTES = 60;
const SECONDS_IN_MS = 1000;
const STALE_TIME_MINUTES = 5;
const STALE_TIME_MS = STALE_TIME_MINUTES * MINUTES * SECONDS_IN_MS;

export const useApartmentComplexes = () =>
  fetchQuery.useQuery("get", "/admin/apartment_complex", undefined, {
    staleTime: STALE_TIME_MS,
  });
