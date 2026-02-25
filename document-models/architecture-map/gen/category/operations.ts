import { type SignalDispatch } from "document-model";
import type {
  AddCategoryAction,
  UpdateCategoryAction,
  RemoveCategoryAction,
} from "./actions.js";
import type { ArchitectureMapState } from "../types.js";

export interface ArchitectureMapCategoryOperations {
  addCategoryOperation: (
    state: ArchitectureMapState,
    action: AddCategoryAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateCategoryOperation: (
    state: ArchitectureMapState,
    action: UpdateCategoryAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeCategoryOperation: (
    state: ArchitectureMapState,
    action: RemoveCategoryAction,
    dispatch?: SignalDispatch,
  ) => void;
}
