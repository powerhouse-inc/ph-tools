import { baseActions } from "document-model";
import {
  modelActions,
  relationshipActions,
  integrationActions,
  categoryActions,
  driveAppActions,
} from "./gen/creators.js";

/** Actions for the ArchitectureMap document model */

export const actions = {
  ...baseActions,
  ...modelActions,
  ...relationshipActions,
  ...integrationActions,
  ...categoryActions,
  ...driveAppActions,
};
