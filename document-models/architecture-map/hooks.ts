import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentById,
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  ArchitectureMapAction,
  ArchitectureMapDocument,
} from "ph-arch-map/document-models/architecture-map";
import {
  assertIsArchitectureMapDocument,
  isArchitectureMapDocument,
} from "./gen/document-schema.js";

/** Hook to get a ArchitectureMap document by its id */
export function useArchitectureMapDocumentById(
  documentId: string | null | undefined,
):
  | [ArchitectureMapDocument, DocumentDispatch<ArchitectureMapAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isArchitectureMapDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ArchitectureMap document */
export function useSelectedArchitectureMapDocument(): [
  ArchitectureMapDocument,
  DocumentDispatch<ArchitectureMapAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsArchitectureMapDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all ArchitectureMap documents in the selected drive */
export function useArchitectureMapDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isArchitectureMapDocument);
}

/** Hook to get all ArchitectureMap documents in the selected folder */
export function useArchitectureMapDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isArchitectureMapDocument);
}
