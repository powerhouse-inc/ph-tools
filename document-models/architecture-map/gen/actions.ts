import type { ArchitectureMapModelAction } from "./model/actions.js";
import type { ArchitectureMapRelationshipAction } from "./relationship/actions.js";
import type { ArchitectureMapIntegrationAction } from "./integration/actions.js";
import type { ArchitectureMapCategoryAction } from "./category/actions.js";
import type { ArchitectureMapDriveAppAction } from "./drive-app/actions.js";

export * from "./model/actions.js";
export * from "./relationship/actions.js";
export * from "./integration/actions.js";
export * from "./category/actions.js";
export * from "./drive-app/actions.js";

export type ArchitectureMapAction =
  | ArchitectureMapModelAction
  | ArchitectureMapRelationshipAction
  | ArchitectureMapIntegrationAction
  | ArchitectureMapCategoryAction
  | ArchitectureMapDriveAppAction;
