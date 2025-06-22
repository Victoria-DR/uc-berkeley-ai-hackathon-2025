"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Analysis() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  return (
    <div>
      <h1>Analysis</h1>
      {data}
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense>
      <Analysis />
    </Suspense>
  );
}
