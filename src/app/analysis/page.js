"use client";

import { useSearchParams } from "next/navigation";

export default function Analysis() {
  const searchParams = useSearchParams();

  return (
    <div>
      <h1>Analysis</h1>
      {searchParams.get("data")}
    </div>
  );
}
