import type { Action } from "document-model";
import type {
  AddCategoryInput,
  UpdateCategoryInput,
  RemoveCategoryInput,
} from "../types.js";

export type AddCategoryAction = Action & {
  type: "ADD_CATEGORY";
  input: AddCategoryInput;
};
export type UpdateCategoryAction = Action & {
  type: "UPDATE_CATEGORY";
  input: UpdateCategoryInput;
};
export type RemoveCategoryAction = Action & {
  type: "REMOVE_CATEGORY";
  input: RemoveCategoryInput;
};

export type ArchitectureMapCategoryAction =
  | AddCategoryAction
  | UpdateCategoryAction
  | RemoveCategoryAction;
