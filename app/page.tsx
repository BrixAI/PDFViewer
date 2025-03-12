"use client";

import { useSearchParams } from "next/navigation";
import PDFViewer from "./pdfViewer";

export default function PDFViewerPage() {
  const searchParams = useSearchParams();
  const document1 = searchParams.get("doc1") || "";
  const document2 = searchParams.get("doc2") || "";
  console.log("DOCUMENTS");
  console.log(document1);
  console.log(document2);

  return <PDFViewer document1={document1} document2={document2} />;
}
