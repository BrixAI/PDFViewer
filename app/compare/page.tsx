"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ComparePDFViewer from "../comparePDFViewer";

function Compare() {
  const searchParams = useSearchParams();
  const document1 = searchParams.get("doc1") || "";
  const document2 = searchParams.get("doc2") || "";
  const theme = searchParams.get("theme") || "light";

  return (
    <ComparePDFViewer
      document1={document1}
      document2={document2}
      theme={theme}
    />
  );
}

// This wrapping is necessary to avoid this error message
// useSearchParams() should be wrapped in a suspense boundary at page "/compare". Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function Page() {
  return (
    <Suspense>
      <Compare />
    </Suspense>
  );
}
