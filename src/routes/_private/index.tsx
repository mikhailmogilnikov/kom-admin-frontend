import { createFileRoute } from "@tanstack/react-router";
import {
  Building2Icon,
  DollarSignIcon,
  HomeIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import { ApartmentTypesChart } from "@/features/dashboard/ui/apartment-types-chart";
import { ComparisonRadarChart } from "@/features/dashboard/ui/comparison-radar-chart";
import { ComplexSelector } from "@/features/dashboard/ui/complex-selector";
import { DateRangePicker } from "@/features/dashboard/ui/date-range-picker";
import { MetricCard } from "@/features/dashboard/ui/metric-card";
import { OccupancyChart } from "@/features/dashboard/ui/occupancy-chart";
import { PaymentStatusChart } from "@/features/dashboard/ui/payment-status-chart";
import { PaymentsDynamicChart } from "@/features/dashboard/ui/payments-dynamic-chart";
import { RequestsDynamicChart } from "@/features/dashboard/ui/requests-dynamic-chart";
import { RevenueChart } from "@/features/dashboard/ui/revenue-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

const DashboardComponent = () => {
  const [selectedComplex, setSelectedComplex] = useState("all");

  // Mock данные для демонстрации
  const metrics = [
    {
      title: "Всего объектов",
      value: 82,
      description: "Квартир в аренде",
      icon: Building2Icon,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Занятость",
      value: "87%",
      description: "71 из 82 квартир",
      icon: HomeIcon,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Доход за месяц",
      value: "12.5М ₽",
      description: "Общая прибыль",
      icon: DollarSignIcon,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Средняя ставка",
      value: "285К ₽",
      description: "За 1-комнатную квартиру",
      icon: TrendingUpIcon,
      trend: { value: 3, isPositive: false },
    },
    {
      title: "Активных арендаторов",
      value: 71,
      description: "Текущие жильцы",
      icon: UsersIcon,
      trend: { value: 5, isPositive: true },
    },
  ];

  const recentActivity = [
    {
      apartment: "ЖК «Солнечный город», дом 2, кв. 45",
      action: "Новый договор аренды",
      date: "2 часа назад",
      status: "success",
    },
    {
      apartment: "ЖК «Зеленый квартал», дом 1, кв. 12",
      action: "Продление договора",
      date: "5 часов назад",
      status: "success",
    },
    {
      apartment: "ЖК «Речной берег», дом 3, кв. 28",
      action: "Расторжение договора",
      date: "1 день назад",
      status: "warning",
    },
    {
      apartment: "ЖК «Парковый», дом 1, кв. 33",
      action: "Техническое обслуживание",
      date: "2 дня назад",
      status: "info",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 max-md:px-4 max-md:py-8">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <div className="flex flex-col gap-2 max-lg:w-full">
          <h1 className="font-bold text-3xl">Дашборд</h1>
          <p className="text-muted-foreground">
            УК "Ключи Москвы" - Управление недвижимостью
          </p>
        </div>
        <div className="flex flex-col gap-4 max-lg:mt-4 max-lg:w-full md:flex-row">
          <ComplexSelector onComplexChange={setSelectedComplex} />
          <DateRangePicker />
        </div>
      </div>

      {/* Основные метрики */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Графики и детальная информация */}
      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {/* Занятость */}
        <OccupancyChart selectedComplex={selectedComplex} />

        {/* Последняя активность */}
        <Card>
          <CardHeader>
            <CardTitle>Недавняя активность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const getStatusColor = () => {
                  if (activity.status === "success") {
                    return "bg-green-500";
                  }
                  if (activity.status === "warning") {
                    return "bg-yellow-500";
                  }
                  return "bg-blue-500";
                };

                return (
                  <div
                    className="flex items-start gap-3"
                    key={`${activity.apartment}-${index}`}
                  >
                    <div
                      className={`mt-1 size-2 rounded-full ${getStatusColor()}`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm leading-none">
                        {activity.apartment}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {activity.action}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Распределение по типам квартир */}
        <ApartmentTypesChart selectedComplex={selectedComplex} />

        {/* Финансовая статистика */}
        <Card>
          <CardHeader>
            <CardTitle>Финансовая статистика</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-muted-foreground text-sm">
                  Доход от аренды
                </span>
                <span className="font-medium">12.5М ₽</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-muted-foreground text-sm">
                  Комиссионные
                </span>
                <span className="font-medium">1.2М ₽</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-muted-foreground text-sm">
                  Обслуживание
                </span>
                <span className="font-medium text-red-500">-450К ₽</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-medium">Чистая прибыль</span>
                <span className="font-bold text-green-500 text-lg">
                  11.3М ₽
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <RevenueChart selectedComplex={selectedComplex} />
        <PaymentsDynamicChart selectedComplex={selectedComplex} />
        <RequestsDynamicChart selectedComplex={selectedComplex} />
        <PaymentStatusChart selectedComplex={selectedComplex} />
        <ComparisonRadarChart selectedComplex={selectedComplex} />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_private/")({
  component: DashboardComponent,
});
