import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { ArchitectureMapPHState } from "ph-arch-map/document-models/architecture-map";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "ph-arch-map/document-models/architecture-map";

/** Document model module for the ArchitectureMap document type */
export const ArchitectureMap: DocumentModelModule<ArchitectureMapPHState> = {
  version: 1,
  reducer,
  actions,
  utils,
  documentModel: createState(defaultBaseState(), documentModel),
};
