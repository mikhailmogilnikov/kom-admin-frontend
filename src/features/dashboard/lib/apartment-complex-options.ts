import type { components } from "@/shared/api/schema";

export const ALL_COMPLEX_VALUE = "all";

export type ApartmentComplex = components["schemas"]["ACSchema"];

export type ComplexOption = {
  value: string;
  label: string;
};

export const buildComplexOptions = (
  complexes: ApartmentComplex[] | undefined
): ComplexOption[] => [
  { value: ALL_COMPLEX_VALUE, label: "Все комплексы" },
  ...(complexes?.map((complex) => ({
    value: String(complex.id),
    label: complex.name,
  })) ?? []),
];
