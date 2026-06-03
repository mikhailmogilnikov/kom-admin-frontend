import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import { getApiBaseUrl } from "./config";
import type { paths } from "./schema";

export const publicFetchClient = createFetchClient<paths>({
  baseUrl: getApiBaseUrl(),
});

/** Клиент для публичных ручек (логин и т.п.) без Authorization. */
export const publicFetchQuery = createClient(publicFetchClient);
