import type { PHDocument, PHBaseState } from "document-model";
import type { ArchitectureMapAction } from "./actions.js";
import type { ArchitectureMapState as ArchitectureMapGlobalState } from "./schema/types.js";

type ArchitectureMapLocalState = Record<PropertyKey, never>;

type ArchitectureMapPHState = PHBaseState & {
  global: ArchitectureMapGlobalState;
  local: ArchitectureMapLocalState;
};
type ArchitectureMapDocument = PHDocument<ArchitectureMapPHState>;

export * from "./schema/types.js";

export type {
  ArchitectureMapGlobalState,
  ArchitectureMapLocalState,
  ArchitectureMapPHState,
  ArchitectureMapAction,
  ArchitectureMapDocument,
};
