import { ClipboardListIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type ApplicationStatusKey = "OPENED" | "WAITING" | "POSTPONED" | "CLOSED";

type StatusRow = {
  status: ApplicationStatusKey;
  label: string;
  count: number;
  hint?: string;
};

const allComplexesRows: StatusRow[] = [
  { status: "OPENED", label: "Открытые", count: 18, hint: "в работе" },
  { status: "WAITING", label: "В ожидании", count: 7 },
  { status: "POSTPONED", label: "Отложены", count: 4 },
  { status: "CLOSED", label: "Закрытые", count: 156, hint: "всего" },
];

const complexesRowsById: Record<string, StatusRow[]> = {
  "1": [
    { status: "OPENED", label: "Открытые", count: 5 },
    { status: "WAITING", label: "В ожидании", count: 2 },
    { status: "POSTPONED", label: "Отложены", count: 1 },
    { status: "CLOSED", label: "Закрытые", count: 42, hint: "всего" },
  ],
  "2": [
    { status: "OPENED", label: "Открытые", count: 4 },
    { status: "WAITING", label: "В ожидании", count: 2 },
    { status: "POSTPONED", label: "Отложены", count: 0 },
    { status: "CLOSED", label: "Закрытые", count: 38, hint: "всего" },
  ],
  "3": [
    { status: "OPENED", label: "Открытые", count: 5 },
    { status: "WAITING", label: "В ожидании", count: 2 },
    { status: "POSTPONED", label: "Отложены", count: 2 },
    { status: "CLOSED", label: "Закрытые", count: 40, hint: "всего" },
  ],
  "4": [
    { status: "OPENED", label: "Открытые", count: 4 },
    { status: "WAITING", label: "В ожидании", count: 1 },
    { status: "POSTPONED", label: "Отложены", count: 1 },
    { status: "CLOSED", label: "Закрытые", count: 36, hint: "всего" },
  ],
};

const statusAccent: Record<ApplicationStatusKey, string> = {
  OPENED: "text-blue-600",
  WAITING: "text-amber-600",
  POSTPONED: "text-muted-foreground",
  CLOSED: "text-green-600",
};

type ApplicationsSummaryCardProps = {
  selectedComplex?: string;
};

export const ApplicationsSummaryCard = ({
  selectedComplex = "all",
}: ApplicationsSummaryCardProps) => {
  const rows =
    selectedComplex === "all"
      ? allComplexesRows
      : (complexesRowsById[selectedComplex] ?? allComplexesRows);

  const activeCount = rows
    .filter((row) => row.status !== "CLOSED")
    .reduce((sum, row) => sum + row.count, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">Заявки</CardTitle>
        <ClipboardListIcon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-bold text-2xl">{activeCount}</p>
          <p className="text-muted-foreground text-xs">активных заявок</p>
        </div>
        <div className="space-y-3 border-t pt-3">
          {rows.map((row) => (
            <div
              className="flex items-center justify-between gap-2"
              key={row.status}
            >
              <div className="min-w-0">
                <p className="text-sm leading-none">{row.label}</p>
                {row.hint && (
                  <p className="text-muted-foreground text-xs">{row.hint}</p>
                )}
              </div>
              <span
                className={`font-semibold tabular-nums ${statusAccent[row.status]}`}
              >
                {row.count}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
