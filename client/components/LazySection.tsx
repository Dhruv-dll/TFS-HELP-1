import React, { Suspense } from "react";
import { useInView } from "react-intersection-observer";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
}

export function LazySection({
  children,
  fallback = null,
  threshold = 0.1,
}: LazySectionProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
