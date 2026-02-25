import type { Action } from "document-model";
import type {
  AddDriveAppInput,
  UpdateDriveAppInput,
  RemoveDriveAppInput,
} from "../types.js";

export type AddDriveAppAction = Action & {
  type: "ADD_DRIVE_APP";
  input: AddDriveAppInput;
};
export type UpdateDriveAppAction = Action & {
  type: "UPDATE_DRIVE_APP";
  input: UpdateDriveAppInput;
};
export type RemoveDriveAppAction = Action & {
  type: "REMOVE_DRIVE_APP";
  input: RemoveDriveAppInput;
};

export type ArchitectureMapDriveAppAction =
  | AddDriveAppAction
  | UpdateDriveAppAction
  | RemoveDriveAppAction;
