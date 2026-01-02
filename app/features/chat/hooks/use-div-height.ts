import { useEffect, useState } from "react";

export function useDivHeight() {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return { ref: setElement, height };
}
