import { createAction } from "document-model/core";
import {
  AddModelInputSchema,
  UpdateModelInputSchema,
  RemoveModelInputSchema,
} from "../schema/zod.js";
import type {
  AddModelInput,
  UpdateModelInput,
  RemoveModelInput,
} from "../types.js";
import type {
  AddModelAction,
  UpdateModelAction,
  RemoveModelAction,
} from "./actions.js";

export const addModel = (input: AddModelInput) =>
  createAction<AddModelAction>(
    "ADD_MODEL",
    { ...input },
    undefined,
    AddModelInputSchema,
    "global",
  );

export const updateModel = (input: UpdateModelInput) =>
  createAction<UpdateModelAction>(
    "UPDATE_MODEL",
    { ...input },
    undefined,
    UpdateModelInputSchema,
    "global",
  );

export const removeModel = (input: RemoveModelInput) =>
  createAction<RemoveModelAction>(
    "REMOVE_MODEL",
    { ...input },
    undefined,
    RemoveModelInputSchema,
    "global",
  );
