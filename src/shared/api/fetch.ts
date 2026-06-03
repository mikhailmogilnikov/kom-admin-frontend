import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import { useSession } from "@/features/auth/model/use-session";
import { getApiBaseUrl } from "./config";
import type { paths } from "./schema";

const UNAUTHORIZED_STATUS = 401;

export const fetchClient = createFetchClient<paths>({
  baseUrl: getApiBaseUrl(),
});

fetchClient.use({
  onRequest: async ({ request }) => {
    const token = await useSession.getState().refreshToken();

    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
      return;
    }

    return new Response(
      JSON.stringify({ message: "Unauthorized", code: UNAUTHORIZED_STATUS }),
      {
        status: UNAUTHORIZED_STATUS,
        headers: { "Content-Type": "application/json" },
      }
    );
  },
});

/** Клиент для защищённых ручек с Bearer и авто-refresh access_token. */
export const fetchQuery = createClient(fetchClient);
