import { createAction } from "document-model/core";
import {
  AddDriveAppInputSchema,
  UpdateDriveAppInputSchema,
  RemoveDriveAppInputSchema,
} from "../schema/zod.js";
import type {
  AddDriveAppInput,
  UpdateDriveAppInput,
  RemoveDriveAppInput,
} from "../types.js";
import type {
  AddDriveAppAction,
  UpdateDriveAppAction,
  RemoveDriveAppAction,
} from "./actions.js";

export const addDriveApp = (input: AddDriveAppInput) =>
  createAction<AddDriveAppAction>(
    "ADD_DRIVE_APP",
    { ...input },
    undefined,
    AddDriveAppInputSchema,
    "global",
  );

export const updateDriveApp = (input: UpdateDriveAppInput) =>
  createAction<UpdateDriveAppAction>(
    "UPDATE_DRIVE_APP",
    { ...input },
    undefined,
    UpdateDriveAppInputSchema,
    "global",
  );

export const removeDriveApp = (input: RemoveDriveAppInput) =>
  createAction<RemoveDriveAppAction>(
    "REMOVE_DRIVE_APP",
    { ...input },
    undefined,
    RemoveDriveAppInputSchema,
    "global",
  );
