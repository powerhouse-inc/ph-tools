import type { EditorModule } from "document-model";
import { lazy } from "react";

export const ArchitectureMap: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/architecture-map"],
  config: {
    id: "architecture-map-editor",
    name: "Architecture Map",
  },
};
