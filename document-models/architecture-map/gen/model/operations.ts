import { type SignalDispatch } from "document-model";
import type {
  AddModelAction,
  UpdateModelAction,
  RemoveModelAction,
} from "./actions.js";
import type { ArchitectureMapState } from "../types.js";

export interface ArchitectureMapModelOperations {
  addModelOperation: (
    state: ArchitectureMapState,
    action: AddModelAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateModelOperation: (
    state: ArchitectureMapState,
    action: UpdateModelAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeModelOperation: (
    state: ArchitectureMapState,
    action: RemoveModelAction,
    dispatch?: SignalDispatch,
  ) => void;
}
