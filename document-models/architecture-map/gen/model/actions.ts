import type { Action } from "document-model";
import type {
  AddModelInput,
  UpdateModelInput,
  RemoveModelInput,
} from "../types.js";

export type AddModelAction = Action & {
  type: "ADD_MODEL";
  input: AddModelInput;
};
export type UpdateModelAction = Action & {
  type: "UPDATE_MODEL";
  input: UpdateModelInput;
};
export type RemoveModelAction = Action & {
  type: "REMOVE_MODEL";
  input: RemoveModelInput;
};

export type ArchitectureMapModelAction =
  | AddModelAction
  | UpdateModelAction
  | RemoveModelAction;
