import { type SignalDispatch } from "document-model";
import type {
  AddDriveAppAction,
  UpdateDriveAppAction,
  RemoveDriveAppAction,
} from "./actions.js";
import type { ArchitectureMapState } from "../types.js";

export interface ArchitectureMapDriveAppOperations {
  addDriveAppOperation: (
    state: ArchitectureMapState,
    action: AddDriveAppAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateDriveAppOperation: (
    state: ArchitectureMapState,
    action: UpdateDriveAppAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeDriveAppOperation: (
    state: ArchitectureMapState,
    action: RemoveDriveAppAction,
    dispatch?: SignalDispatch,
  ) => void;
}
