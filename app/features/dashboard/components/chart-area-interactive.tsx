"use client";

import { Suspense, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Spinner } from "~/components/ui/spinner";

import { useMonthlyCoinUsageQuery } from "../hooks/use-monthly-coin-usage-query";

const chartConfig = {
  total: {
    label: "코인 사용량",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface ChartAreaProps {
  year: number;
  month: number;
}

function ChartArea({ year, month }: ChartAreaProps) {
  const { data } = useMonthlyCoinUsageQuery({ year, month });

  const daysInMonth = new Date(year, month, 0).getDate();
  const usageMap = new Map(data.dailyUsage.map((usage) => [usage.date, usage.coinUsed]));

  const fullMonthData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return {
      date: dateStr,
      total: usageMap.get(dateStr) || 0,
    };
  });

  const hasUsageData = data.dailyUsage.length > 0;

  if (!hasUsageData) {
    return (
      <div className="flex h-60 items-center justify-center text-muted-foreground">
        사용 기록이 없습니다
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-60 w-full">
      <AreaChart data={fullMonthData}>
        <defs>
          <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-total)" stopOpacity={1.0} />
            <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                });
              }}
              hideIndicator
              indicator="dot"
            />
          }
        />
        <Area dataKey="total" type="monotone" fill="url(#fillTotal)" stroke="var(--color-total)" />
      </AreaChart>
    </ChartContainer>
  );
}

export function ChartAreaInteractive() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState((currentDate.getMonth() + 1).toString());

  // 2025년부터 현재 연도까지
  const years = Array.from({ length: currentDate.getFullYear() - 2025 + 1 }, (_, i) =>
    (2025 + i).toString(),
  );

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}월`,
  }));

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>코인 사용량</CardTitle>
        <CardDescription>
          {selectedYear}년 {selectedMonth}월 코인 사용량
        </CardDescription>
        <CardAction>
          <div className="flex gap-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-24" size="sm" aria-label="연도 선택">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {years.map((year) => (
                  <SelectItem key={year} value={year} className="rounded-lg">
                    {year}년
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-20" size="sm" aria-label="월 선택">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value} className="rounded-lg">
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <Suspense
          fallback={
            <div className="h-60 flex items-center justify-center text-muted-foreground">
              <Spinner className="size-8" />
            </div>
          }
        >
          <ChartArea year={parseInt(selectedYear)} month={parseInt(selectedMonth)} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
