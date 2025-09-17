"use client";

import { WebViewerInstance } from "@pdftron/webviewer";
import { useEffect, useRef } from "react";

export default function FindPDFViewer({
  document = "",
  search = "",
  theme = "light",
}: {
  document?: string;
  search?: string;
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

        UI.addEventListener(UI.Events.VIEWER_LOADED, async () => {
          await Core.getDocumentViewers()[0].loadDocument(document);
          if (search) {
            UI.searchText(search, {
              caseSensitive: false,
              wholeWord: false,
              wildcard: false,
              regex: false,
            });
          }
        });

        // // Get the document viewer
        // const documentViewer = Core.getDocumentViewers()[0];

        // // Load the document and perform search when ready
        // documentViewer.addEventListener("documentLoaded", async () => {
        //   if (search) {
        //     // Perform the search
        //     UI.searchText(search, {
        //       caseSensitive: false,
        //       wholeWord: false,
        //       wildcard: false,
        //       regex: false,
        //     });
        //   }
        // });

        // // Load the document
        // if (document) {
        //   documentViewer.loadDocument(document);
        // }

        // Enable search-related features
        UI.enableFeatures([UI.Feature.TextSelection, UI.Feature.Search]);

        UI.setTheme(theme);
      });
    });
  }, [document, search, theme]);

  return (
    <div className="flex h-screen min-h-screen w-full flex-col">
      <div className="h-full" ref={viewer}></div>
    </div>
  );
}
