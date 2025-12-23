import { CircleDollarSign } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useBalanceQuery } from "~/features/wallet/hooks/use-balance-query";

export function Balance() {
  const { data: balance } = useBalanceQuery();

  const [displayValue, setDisplayValue] = useState(balance);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    const startValue = displayValue;
    const endValue = balance;
    const diff = Math.abs(endValue - startValue);

    // 차이가 없으면 애니메이션 안 함
    if (diff === 0) return;

    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / 1000, 1);

      const currentValue = startValue + (endValue - startValue) * progress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [balance]);

  return (
    <div className="flex items-center justify-center gap-2 text-muted-foreground">
      <CircleDollarSign size={16} />
      <p>{displayValue.toFixed(3)}</p>
    </div>
  );
}
