import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";

import {
  ALL_COMPLEX_VALUE,
  buildComplexOptions,
} from "@/features/dashboard/lib/apartment-complex-options";
import { useApartmentComplexes } from "@/features/dashboard/model/use-apartment-complexes";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Spinner } from "@/shared/ui/spinner";

type ComplexSelectorProps = {
  onComplexChange?: (complex: string) => void;
};

export const ComplexSelector = ({ onComplexChange }: ComplexSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(ALL_COMPLEX_VALUE);

  const { data: complexes, isPending, isError } = useApartmentComplexes();

  const options = useMemo(() => buildComplexOptions(complexes), [complexes]);

  const selectedLabel = options.find(
    (complex) => complex.value === value
  )?.label;

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? ALL_COMPLEX_VALUE : currentValue;
    setValue(newValue);
    setOpen(false);
    onComplexChange?.(newValue);
  };

  return (
    <div className="flex flex-col gap-3 max-md:w-full">
      <Label className="px-1" htmlFor="complex-selector">
        Жилой комплекс
      </Label>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className="w-70 justify-between bg-card font-normal shadow-lg hover:bg-card/90 max-md:w-full"
            disabled={isPending}
            id="complex-selector"
            role="combobox"
            type="button"
            variant="outline"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-4" />
                Загрузка…
              </span>
            ) : (
              (selectedLabel ?? "Выберите комплекс")
            )}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[280px] p-0">
          <Command>
            <CommandInput placeholder="Поиск комплекса..." />
            <CommandList>
              <CommandEmpty>
                {isError
                  ? "Не удалось загрузить список ЖК"
                  : "Комплекс не найден"}
              </CommandEmpty>
              <CommandGroup>
                {options.map((complex) => (
                  <CommandItem
                    key={complex.value}
                    keywords={[complex.label]}
                    onSelect={() => handleSelect(complex.value)}
                    value={complex.value}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        value === complex.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {complex.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
