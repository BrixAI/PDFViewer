"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import FindPDFViewer from "../findPDFViewer";

export default function Find() {
  const searchParams = useSearchParams();
  const document = searchParams.get("doc") || "";
  const search = searchParams.get("search") || "";
  const theme = searchParams.get("theme") || "light";

  return (
    <Suspense>
      <FindPDFViewer document={document} search={search} theme={theme} />
    </Suspense>
  );
}
