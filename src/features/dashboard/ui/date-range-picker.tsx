import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

const DEFAULT_DAYS_BACK = 30;

type DateRangePickerProps = {
  onDateChange?: (dateRange: DateRange | undefined) => void;
};

export const DateRangePicker = ({ onDateChange }: DateRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(
      new Date().setDate(new Date().getDate() - DEFAULT_DAYS_BACK)
    ),
    to: new Date(),
  });

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (onDateChange) {
      onDateChange(range);
    }
  };

  const formatDateRange = () => {
    if (!dateRange?.from) {
      return "Выберите период";
    }
    if (!dateRange.to) {
      return dateRange.from.toLocaleDateString("ru-RU");
    }
    return `${dateRange.from.toLocaleDateString("ru-RU")} - ${dateRange.to.toLocaleDateString("ru-RU")}`;
  };

  return (
    <div className="flex flex-col gap-3 max-md:w-full">
      <Label className="px-1" htmlFor="date-range">
        Период
      </Label>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            className="w-70 justify-start bg-card font-normal shadow-lg hover:bg-card/90 max-md:w-full"
            id="date-range"
            variant="outline"
          >
            <CalendarIcon className="mr-2 size-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={dateRange?.from}
            mode="range"
            numberOfMonths={2}
            onSelect={handleSelect}
            selected={dateRange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
