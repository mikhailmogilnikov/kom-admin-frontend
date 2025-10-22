import { FancySwitch } from "@omit/react-fancy-switch";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV_OPTIONS = [
  { id: 1, name: "Дашборд", to: "/" as const, isDisabled: false },
  { id: 2, name: "Объекты", to: "/objects" as const, isDisabled: false },
  { id: 3, name: "Пользователи", to: "/users" as const, isDisabled: false },
  { id: 4, name: "Заявки", to: "/requests" as const, isDisabled: false },
];

export const Tabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState(1);

  // Синхронизация выбранной опции с текущим роутом
  useEffect(() => {
    const currentOption = NAV_OPTIONS.find(
      (option) => option.to === location.pathname
    );
    if (currentOption) {
      setSelectedOption(currentOption.id);
    }
  }, [location.pathname]);

  const handleNavigationChange = (value: number) => {
    const option = NAV_OPTIONS.find((opt) => opt.id === value);
    if (option) {
      setSelectedOption(value);
      navigate({ to: option.to });
    }
  };

  return (
    <FancySwitch
      className="flex w-fit items-center rounded-xl p-1 max-lg:hidden"
      disabledKey="isDisabled"
      highlighterClassName="dark:bg-foreground/10 bg-foreground/5 border border-border rounded-lg"
      labelKey="name"
      onChange={(value) => handleNavigationChange(Number(value))}
      options={NAV_OPTIONS}
      radioClassName="px-4 py-1 rounded-full cursor-pointer font-medium "
      value={selectedOption}
      valueKey="id"
    />
  );
};
