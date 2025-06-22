"use client";

import { useSearchParams } from "next/navigation";

export default function Analysis() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  return (
    <div>
      <h1>Analysis</h1>
      {}
    </div>
  );
}
