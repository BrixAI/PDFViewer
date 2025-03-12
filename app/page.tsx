"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PDFViewer from "./pdfViewer";

export default function PDFViewerPage() {
  const searchParams = useSearchParams();
  const document1 = searchParams.get("doc1") || "";
  const document2 = searchParams.get("doc2") || "";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PDFViewer document1={document1} document2={document2} />
    </Suspense>
  );
}
