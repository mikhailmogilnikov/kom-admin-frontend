import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export const formatRelativeTime = (isoDate: string): string =>
  formatDistanceToNow(new Date(isoDate), { addSuffix: true, locale: ru });
