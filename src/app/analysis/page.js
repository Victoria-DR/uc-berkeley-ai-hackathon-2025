"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Analysis() {
  const searchParams = useSearchParams();

  return (
    <Suspense>
      <div>
        <h1>Analysis</h1>
        {searchParams.get("data")}
      </div>
    </Suspense>
  );
}
