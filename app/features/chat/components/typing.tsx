import { useState, useRef, useEffect } from "react";

interface TypingProps {
  children: string;
  speed?: number; // characters per second
  enabled?: boolean;
  initial?: boolean;
}

export function Typing({ children, speed = 40, enabled = true, initial = true }: TypingProps) {
  const [displayedText, setDisplayedText] = useState(initial ? "" : children);
  const indexRef = useRef(initial ? 0 : children.length);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(children);
      return;
    }

    // 새 콘텐츠가 기존 콘텐츠와 이어지지 않으면 초기화
    if (!children.startsWith(displayedText)) {
      setDisplayedText("");
      indexRef.current = 0;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayedText(() => {
        const nextIndex = indexRef.current + 1;
        indexRef.current = nextIndex;
        if (nextIndex >= children.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return children;
        }
        return children.slice(0, nextIndex);
      });
    }, 1000 / speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [children, speed, enabled]);

  return displayedText;
}
