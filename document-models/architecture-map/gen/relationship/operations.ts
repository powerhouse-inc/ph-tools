import { type SignalDispatch } from "document-model";
import type {
  AddRelationshipAction,
  UpdateRelationshipAction,
  RemoveRelationshipAction,
} from "./actions.js";
import type { ArchitectureMapState } from "../types.js";

export interface ArchitectureMapRelationshipOperations {
  addRelationshipOperation: (
    state: ArchitectureMapState,
    action: AddRelationshipAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateRelationshipOperation: (
    state: ArchitectureMapState,
    action: UpdateRelationshipAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeRelationshipOperation: (
    state: ArchitectureMapState,
    action: RemoveRelationshipAction,
    dispatch?: SignalDispatch,
  ) => void;
}
