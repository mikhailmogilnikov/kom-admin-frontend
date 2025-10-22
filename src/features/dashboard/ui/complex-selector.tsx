import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
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

const COMPLEXES = [
  { value: "all", label: "Все комплексы" },
  { value: "residential-complex-1", label: "ЖК «Солнечный город»" },
  { value: "residential-complex-2", label: "ЖК «Зеленый квартал»" },
  { value: "residential-complex-3", label: "ЖК «Речной берег»" },
  { value: "residential-complex-4", label: "ЖК «Парковый»" },
];

type ComplexSelectorProps = {
  onComplexChange?: (complex: string) => void;
};

export const ComplexSelector = ({ onComplexChange }: ComplexSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("all");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "all" : currentValue;
    setValue(newValue);
    setOpen(false);
    if (onComplexChange) {
      onComplexChange(newValue);
    }
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
            id="complex-selector"
            role="combobox"
            variant="outline"
          >
            {value
              ? COMPLEXES.find((complex) => complex.value === value)?.label
              : "Выберите комплекс"}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[280px] p-0">
          <Command>
            <CommandInput placeholder="Поиск комплекса..." />
            <CommandList>
              <CommandEmpty>Комплекс не найден</CommandEmpty>
              <CommandGroup>
                {COMPLEXES.map((complex) => (
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
