import { type SignalDispatch } from "document-model";
import type {
  AddIntegrationAction,
  UpdateIntegrationAction,
  RemoveIntegrationAction,
} from "./actions.js";
import type { ArchitectureMapState } from "../types.js";

export interface ArchitectureMapIntegrationOperations {
  addIntegrationOperation: (
    state: ArchitectureMapState,
    action: AddIntegrationAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateIntegrationOperation: (
    state: ArchitectureMapState,
    action: UpdateIntegrationAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeIntegrationOperation: (
    state: ArchitectureMapState,
    action: RemoveIntegrationAction,
    dispatch?: SignalDispatch,
  ) => void;
}
