import type { Action } from "document-model";
import type {
  AddIntegrationInput,
  UpdateIntegrationInput,
  RemoveIntegrationInput,
} from "../types.js";

export type AddIntegrationAction = Action & {
  type: "ADD_INTEGRATION";
  input: AddIntegrationInput;
};
export type UpdateIntegrationAction = Action & {
  type: "UPDATE_INTEGRATION";
  input: UpdateIntegrationInput;
};
export type RemoveIntegrationAction = Action & {
  type: "REMOVE_INTEGRATION";
  input: RemoveIntegrationInput;
};

export type ArchitectureMapIntegrationAction =
  | AddIntegrationAction
  | UpdateIntegrationAction
  | RemoveIntegrationAction;
