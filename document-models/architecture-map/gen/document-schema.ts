import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { architectureMapDocumentType } from "./document-type.js";
import { ArchitectureMapStateSchema } from "./schema/zod.js";
import type {
  ArchitectureMapDocument,
  ArchitectureMapPHState,
} from "./types.js";

/** Schema for validating the header object of a ArchitectureMap document */
export const ArchitectureMapDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(architectureMapDocumentType),
  });

/** Schema for validating the state object of a ArchitectureMap document */
export const ArchitectureMapPHStateSchema = BaseDocumentStateSchema.extend({
  global: ArchitectureMapStateSchema(),
});

export const ArchitectureMapDocumentSchema = z.object({
  header: ArchitectureMapDocumentHeaderSchema,
  state: ArchitectureMapPHStateSchema,
  initialState: ArchitectureMapPHStateSchema,
});

/** Simple helper function to check if a state object is a ArchitectureMap document state object */
export function isArchitectureMapState(
  state: unknown,
): state is ArchitectureMapPHState {
  return ArchitectureMapPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a ArchitectureMap document state object */
export function assertIsArchitectureMapState(
  state: unknown,
): asserts state is ArchitectureMapPHState {
  ArchitectureMapPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a ArchitectureMap document */
export function isArchitectureMapDocument(
  document: unknown,
): document is ArchitectureMapDocument {
  return ArchitectureMapDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a ArchitectureMap document */
export function assertIsArchitectureMapDocument(
  document: unknown,
): asserts document is ArchitectureMapDocument {
  ArchitectureMapDocumentSchema.parse(document);
}
