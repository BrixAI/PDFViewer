"use client";

import { WebViewerInstance } from "@pdftron/webviewer";
import { useEffect, useRef } from "react";

export default function PDFViewer({
  document1 = "",
  document2 = "",
  theme = "light",
}: {
  document1?: string;
  document2?: string;
  theme?: string;
}) {
  const viewer = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    // Due to SSR in Next.js, we need to import the module dynamically, to avoid window is not defined error due to re-rendering.
    // Read more here: https://github.com/vercel/next.js/discussions/42319
    import("@pdftron/webviewer").then((module) => {
      const WebViewer = module.default;
      WebViewer(
        {
          path: "/webviewer/lib",
          fullAPI: true,
          licenseKey:
            "demo:1741255566633:6146cf330300000000c20a11a13380d4437415806174d1de201e24610d",
        },
        viewer.current as HTMLDivElement
      ).then((instance: WebViewerInstance) => {
        const { UI, Core } = instance;

        UI.addEventListener(UI.Events.MULTI_VIEWER_READY, async () => {
          await Promise.all([
            Core.getDocumentViewers()[0].loadDocument(document1),
            Core.getDocumentViewers()[1].loadDocument(document2),
          ]);
          UI.startTextComparison();
          UI.enableMultiViewerSync();
        });

        UI.enableFeatures([UI.Feature.ComparePages]);
        UI.enterMultiViewerMode();

        UI.setTheme(theme);
      });
    });
  }, [document1, document2, theme]);

  return (
    <div className="flex h-screen min-h-screen w-full flex-col">
      <div className="h-full" ref={viewer}></div>
    </div>
  );
}
