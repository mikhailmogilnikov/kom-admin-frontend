import { FancySwitch } from "@omit/react-fancy-switch";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV_OPTIONS = [
  { id: 1, name: "Дешборд", to: "/" as const, isDisabled: false },
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
      className="flex w-fit items-center rounded-lg bg-card p-1 max-md:hidden"
      disabledKey="isDisabled"
      highlighterClassName="bg-foreground/10 rounded-md"
      labelKey="name"
      onChange={(value) => handleNavigationChange(Number(value))}
      options={NAV_OPTIONS}
      radioClassName="px-4 py-1 rounded-full cursor-pointer"
      value={selectedOption}
      valueKey="id"
    />
  );
};
