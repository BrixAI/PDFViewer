"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PDFViewer from "./pdfViewer";

function PDF() {
  const searchParams = useSearchParams();
  const document1 = searchParams.get("doc1") || "";
  const document2 = searchParams.get("doc2") || "";

  return <PDFViewer document1={document1} document2={document2} />;
}

export default function Page() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <PDF />
    </Suspense>
  );
}
