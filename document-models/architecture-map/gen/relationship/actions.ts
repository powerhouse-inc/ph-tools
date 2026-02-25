import type { Action } from "document-model";
import type {
  AddRelationshipInput,
  UpdateRelationshipInput,
  RemoveRelationshipInput,
} from "../types.js";

export type AddRelationshipAction = Action & {
  type: "ADD_RELATIONSHIP";
  input: AddRelationshipInput;
};
export type UpdateRelationshipAction = Action & {
  type: "UPDATE_RELATIONSHIP";
  input: UpdateRelationshipInput;
};
export type RemoveRelationshipAction = Action & {
  type: "REMOVE_RELATIONSHIP";
  input: RemoveRelationshipInput;
};

export type ArchitectureMapRelationshipAction =
  | AddRelationshipAction
  | UpdateRelationshipAction
  | RemoveRelationshipAction;
