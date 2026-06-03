import type { components } from "@/shared/api/schema";

type MoneyResponse = components["schemas"]["MoneyResponse"];

const MINOR_UNITS_PER_MAJOR = 100;
const THOUSAND = 1000;
const MILLION = 1_000_000;

export const moneyToMajor = (money: MoneyResponse): number =>
  money.amountMinor / MINOR_UNITS_PER_MAJOR;

export const formatMoney = (money: MoneyResponse): string => {
  const amount = moneyToMajor(money);
  const currencySymbol = money.currency === "RUB" ? "₽" : money.currency;

  if (Math.abs(amount) >= MILLION) {
    const millions = amount / MILLION;
    const formatted =
      millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1);
    return `${formatted}М ${currencySymbol}`;
  }

  if (Math.abs(amount) >= THOUSAND) {
    const thousands = amount / THOUSAND;
    const formatted =
      thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1);
    return `${formatted}К ${currencySymbol}`;
  }

  return `${Math.round(amount).toLocaleString("ru-RU")} ${currencySymbol}`;
};
