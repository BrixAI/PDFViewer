"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ComparePDFViewer from "../comparePDFViewer";

export default function Compare() {
  const searchParams = useSearchParams();
  const document1 = searchParams.get("doc1") || "";
  const document2 = searchParams.get("doc2") || "";
  const theme = searchParams.get("theme") || "light";

  return (
    <Suspense>
      <ComparePDFViewer
        document1={document1}
        document2={document2}
        theme={theme}
      />
    </Suspense>
  );
}
