import { IconTrendingUp } from "@tabler/icons-react";
import { Suspense } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { formatNumberParts } from "~/shared/utils/formatNumberParts";

import { useBalanceQuery } from "../hooks/use-balance-query";
import { useCoinUsageQuery } from "../hooks/use-coin-usage-query";
import { useRemainingDaysQuery } from "../hooks/use-remaining-days-query";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 flex flex-col @2xl/main:flex-row">
      {/* 코인 잔액 */}
      <Suspense>
        <BalanceCard />
      </Suspense>

      {/* 이번 달 코인 사용량 */}
      <Suspense>
        <UsageCard />
      </Suspense>

      {/* 예상 사용 가능 기간 */}
      <Suspense>
        <EstimationCard />
      </Suspense>
    </div>
  );
}

function BalanceCard() {
  const { data: balance } = useBalanceQuery();
  const { integerPart, decimalPart } = formatNumberParts(balance);

  return (
    <Card className="@container/card flex-1">
      <CardHeader>
        <CardDescription>코인 잔액</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {integerPart}
          {decimalPart && (
            <span className="text-lg text-muted-foreground @[250px]/card:text-xl">
              .{decimalPart}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start text-sm">
        <Button className="w-full">충전하기</Button>
      </CardFooter>
    </Card>
  );
}

function UsageCard() {
  const {
    data: { currentMonthUsage, changeRate },
  } = useCoinUsageQuery();
  const { integerPart, decimalPart } = formatNumberParts(currentMonthUsage);

  return (
    <Card className="@container/card flex-1">
      <CardHeader>
        <CardDescription>이번 달 코인 사용량</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {integerPart}
          {decimalPart && (
            <span className="text-lg text-muted-foreground @[250px]/card:text-xl">
              .{decimalPart}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
          {changeRate !== null && (
            <>
              {changeRate > 0
                ? `지난달 대비 ${changeRate.toFixed(2)}% 증가`
                : changeRate < 0
                  ? `지난달 대비 ${Math.abs(changeRate).toFixed(2)}% 감소`
                  : "지난달과 동일"}
              <IconTrendingUp className="size-4" />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

function EstimationCard() {
  const { data: remainingDays } = useRemainingDaysQuery();

  if (remainingDays === null) return null;

  return (
    <Card className="@container/card flex-1">
      <CardHeader>
        <CardDescription>예상 사용 가능 기간</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          ≈{remainingDays.toLocaleString()}일
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
          gpt-4 모델 기준
        </div>
      </CardFooter>
    </Card>
  );
}
